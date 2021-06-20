const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const codification = require('./../utils/codification');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const trace = require('./../access_permissions/traces');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const publishCriteres = catchAsync(async() => {
    const criteres = await models.Fiche_criteres.findAll({
        include: { model: models.Gouvernorat, as: 'gouvernorat', attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt']}}
    });

    pubsub.publish('CRITERES', { criteres });
});


exports.consulter_tous_les_criteres = catchAsync(async (req, res, next) => {

    const criteres = await models.Fiche_criteres.findAll({
        include: { model: models.Gouvernorat, as: 'gouvernorat', attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt']}}
    });
  
    if(!criteres){
       return next(new AppError('No Fiche de criteres found.', 404));
    }

    await publishCriteres();
  
    res.status(200).json({
        status: 'success',
        results: criteres.length,
        criteres
    });
    
});

exports.consulter_critere = catchAsync(async (req, res, next) => {

    const critere = await models.Gouvernorat.findOne(
        {
        where: { code: req.params.id },
        include: { model: models.Fiche_criteres, as: 'fiche_criteres', attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt']}},
        attributes: { exclude: ['createdAt', 'updatedAt']}
        }
    );

    console.log(critere);
  
    if(!critere){
      return next(new AppError('No critere with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      critere
   });

});

exports.ajout_critere = catchAsync(async (req, res, next) => {

    const nouveau_critere = await models.Fiche_criteres.create({id: uuidv4(), ...req.body});
  
    if(!nouveau_critere){
       return next(new AppError('Invalid fields or duplicate critere', 401));
    }

    await publishCriteres();

    res.status(201).json({
        status: 'success',
        nouveau_critere
    });

});

exports.modifier_critere = catchAsync(async(req, res, next) => {

    const fiche_critere = await models.Fiche_criteres.update(req.body, { where: {id: req.params.id } });
    //const gouvernorat = await models.Gouvernorat.findByPk(fiche_critere.dataValues.gouvernorat_id);
    const fiche = await models.Fiche_criteres.findByPk(req.params.id,{
        include: { model: models.Gouvernorat, as: 'gouvernorat' }
    });

    if(!fiche_critere){
        return next(new AppError('Invalid fields or No projet found with this ID', 404));
    }

    await publishCriteres();

    await trace.ajout_trace(req.user, `Modifier la fiche des criteres de la gouvernorat ${fiche.gouvernorat.nom_fr}`);
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.test_eligible = catchAsync( async(req, res, next) => {
    console.log('helloooo');
    const projets = await models.sequelize.query("SELECT DISTINCT(p.id) FROM projets as p, fiche_criteres as f, quartiers as q, communes as c, gouvernorats as g WHERE g.id = f.gouvernorat_id and g.id = c.gouvernorat_id and c.id = q.commune_id and q.projet_id = p.id and p.surface_totale >= f.surface_totale and p.surface_urbanisee_totale >= f.surface_urbanisee_totale and p.nombre_logements_totale >= f.nombre_logements_totale and p.nombre_habitants_totale >= f.nombre_habitants_totale and p.eligible = 0",
    {
        type: models.sequelize.QueryTypes.SELECT 
    });

    if(!projets){
        return next(new AppError('No projets found', 404));
    }

    console.log(projets);

    projets.map(async(projet) => {
        await models.Projet.update({ eligible: true },{ where: { id: projet.id } });
    });

    await trace.ajout_trace(req.user, `Faire le test de l'egibilité`);

    res.status(203).json({
        status: 'success'
    });
});

exports.critereResolvers = {
    Subscription: {
        criteres: {
            subscribe: async (_,__,{id}) => {

                /*const roles = await models.sequelize.query(
                    "SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_fonctionalités` as rf, `fonctionalités` as f "
                    +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = rf.role_id AND rf.fonctionalite_id = f.id AND f.titre = :fonctionalite",
                    { 
                        replacements: { utilisateur: id, fonctionalite: "consulter tous les utilisateurs" },
                        type: models.sequelize.QueryTypes.SELECT 
                    }
                );
        
                if (roles.length == 0) {    
                       throw new AppError('You do not have permission to perform this action', 403);
                }*/

                return pubsub.asyncIterator(['CRITERES']);
            }
        }
    }
}
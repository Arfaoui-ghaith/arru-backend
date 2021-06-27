const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const trace = require('./../access_permissions/traces');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { Op } = require("sequelize");
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const publishMemoires = catchAsync(async() => {
    const memoires = await models.Memoire.findAll({
        include:[
            { model: models.Financement, as: 'financements', attributes: { exclude: ['createdAt','updatedAt','image'] },
                include: { model: models.Bailleur_fonds, as: 'bailleur_fond', attributes: { exclude: ['createdAt','updatedAt','image'] } }
            },
            { model: models.Decompte, as: 'decompte', attributes: { exclude: ['createdAt','updatedAt','memoire_id','prestataire_id'] },
                include: { model: models.Prestataire, as: 'prestataire', attributes: { exclude: ['createdAt','updatedAt','memoire_id'] } } 
            },
            { model: models.Projet, as: 'projet', attributes: { exclude: ['createdAt','updatedAt'] } }
        ],
        attributes: { exclude: ['createdAt','updatedAt'] }
    });
    pubsub.publish('MEMOIRES', { memoires });
});

exports.consulter_tous_les_memoires = catchAsync(async (req, res, next) => {

    const memoires = await models.Memoire.findAll({
        include:[
            { model: models.Financement, as: 'financements', attributes: { exclude: ['createdAt','updatedAt','image'] },
                include: { model: models.Bailleur_fonds, as: 'bailleur_fond', attributes: { exclude: ['createdAt','updatedAt','image'] } }
            },
            { model: models.Decompte, as: 'decompte', attributes: { exclude: ['createdAt','updatedAt','memoire_id','prestataire_id'] },
                include: { model: models.Prestataire, as: 'prestataire', attributes: { exclude: ['createdAt','updatedAt','memoire_id'] } } 
            },
            { model: models.Projet, as: 'projet', attributes: { exclude: ['createdAt','updatedAt'] } }
        ],
        attributes: { exclude: ['createdAt','updatedAt'] }
    });

    if(!memoires){
        return next(new AppError('No memoires found.', 404));
    }

   
  
    res.status(200).json({
        status: 'success',
        results: memoires.length,
        memoires
    });

});

exports.consulter_tous_les_memoires_sans_decompte = catchAsync(async (req, res, next) => {

    const memoires = await models.Memoire.findAll({
        include:[
            { model: models.Decompte, as: 'decompte', required: false, where: { memoire_id: { [Op.eq]: null } }, attributes: { exclude: ['createdAt','updatedAt','memoire_id','prestataire_id'] }},
            { model: models.Projet, as: 'projet', attributes: { exclude: ['createdAt','updatedAt'] } }
        ],
        required: true,
        attributes: { exclude: ['createdAt','updatedAt'] }
    });

    if(!memoires){
        return next(new AppError('No memoires found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: memoires.length,
        memoires
    });

});

exports.consulter_memoire = catchAsync(async (req, res, next) => {

    const memoire = await models.Bailleur_fonds.findAll({
        include: {
            model: models.Financement, as: 'financements', required: false, where: { memoire_id: req.params.id }
        },
        subQuery: false,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
  
    if(!memoire){
      return next(new AppError('No memoire with this ID.',404));
    }
   
    res.status(200).json({
      status: 'success',
      memoire
    });

});

exports.ajout_memoire = catchAsync(async (req, res, next) => {

    const nouveau_memoire = await models.Memoire.create({id: uuidv4(),...req.body});

    if(!nouveau_memoire){
        return next(new AppError('Invalid fields or duplicate memoire', 401));
    }

    const etat = await models.Bailleur_fonds.findOne({ where: { nom: "ETAT" } });

    await models.Financement.bulkCreate([
        {
            id: uuidv4(),
            montant: (nouveau_memoire.tva + nouveau_memoire.timbre_fiscale + nouveau_memoire.gestion_frais_tva),
            bailleur_id: etat.id,
            memoire_id: nouveau_memoire.id,
            type: "prévisionnel"
        },
        {
            id: uuidv4(),
            bailleur_id: etat.id,
            memoire_id: nouveau_memoire.id,
            type: "deblocage"
        },
        {
            id: uuidv4(),
            montant: -(nouveau_memoire.tva + nouveau_memoire.timbre_fiscale + nouveau_memoire.gestion_frais_tva),
            bailleur_id: etat.id,
            memoire_id: nouveau_memoire.id,
            type: "reliquat"
        },
    ]);

    const projet = await models.Projet.findByPk(nouveau_memoire.projet_id);

    await publishMemoires();

    const interface = await models.Interface.findOne({ where: { titre: 'gestion des decomptes' } });

    await notification.ajout_notification(interface.id, "le direction IDDP faire le test de l'egibilité.","success");
    await trace.ajout_trace(req.user, `Ajouter memoire pour le projet ${projet.code}`);
  
    res.status(201).json({
        status: 'success',
    });

});


exports.modifier_Memoire = catchAsync(async(req, res, next) => {

    const memoire = await models.Memoire.update(req.body, { where: { id: req.params.id } });
  
    if(!memoire){
       return next(new AppError('Invalid fields or No memoire found with this ID', 404));
    }

    const memoireInfo = await models.Memoire.findByPk(req.params.id)
    const projet = await models.Projet.findByPk(memoireInfo.projet_id);

    console.log(projet);

    await publishMemoires();

    await trace.ajout_trace(req.user, `Modifier memoire pour le projet ${projet.code}`);
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_memoire = catchAsync(async(req, res, next) => {

    const memoireInfo = await models.Memoire.findByPk(req.params.id, {
        include: { model: models.Projet, as: 'projet' }
    });

    const memoire = await models.Memoire.destroy({ where: { id: req.params.id } });
  
    if(!memoire){
       return next(new AppError('Invalid fields or No memoire found with this ID', 404));
    }

    await publishMemoires();
    
    await trace.ajout_trace(req.user, `Supprimer memoire pour le projet ${memoireInfo.projet.code}`);
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.memoiresResolvers = {
    Subscription: {
        memoires: {
            subscribe: async (_,__,{id}) => {

                const roles = await models.sequelize.query(
                    "SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_fonctionalités` as rf, `fonctionalités` as f "
                    +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = rf.role_id AND rf.fonctionalite_id = f.id AND f.titre = :fonctionalite",
                    { 
                        replacements: { utilisateur: id, fonctionalite: "consulter les memoires" },
                        type: models.sequelize.QueryTypes.SELECT 
                    }
                );
        
                if (roles.length == 0) {    
                       throw new AppError('You do not have permission to perform this action', 403);
                }

                return pubsub.asyncIterator(['MEMOIRES']);
            }
        }
    }
}

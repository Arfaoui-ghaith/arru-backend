const models = require('./../../models/index');
const { v4: uuidv4 } = require('uuid');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.consulter_tous_les_quartiers = catchAsync(async (req, res, next) => {

    const quartiers = await models.sequelize.query(
    "select p.nom as projet_nom, q.id, q.nom, q.iat, q.ing from projets as p, quartiers as q where p.id = q.projet_id",
    {
        type: models.sequelize.QueryTypes.SELECT
    });
  
    if(!quartiers){
       return next(new AppError('No quartiers found.', 404));
    }

    let quartiersInfos = [];
    
    for(const quartier of quartiers){
        console.log(quartier)
        let limites = await models.sequelize.query(
            "select lq.iat, lq.ing from limite_quartiers as lq where lq.qaurtier_id = :quartier ORDER BY lq.createdAt",
            {
                replacements: { quartier: quartier.id },
                type: models.sequelize.QueryTypes.SELECT
            });
        
        let obj = { ...quartier, limites }
        quartiersInfos.push(obj);
    }
  
    res.status(200).json({
        status: 'success',
        results: quartiersInfos.length,
        quartiers: quartiersInfos
    });
});

exports.consulter_tous_les_quartiers_par_gouvernourat = catchAsync(async (req, res, next) => {

    const quartiers = await models.sequelize.query(
    "select p.nom_fr as projet_nom_fr, p.nom_ar as projet_nom_ar, q.id, q.nom, q.iat, q.ing from projets as p, quartiers as q where p.id = q.projet_id and SUBSTRING(p.commune_id,1,3) = :gouvernorat",
    {
        replacements: { gouvernorat: req.body.gouvernorat_id },
        type: models.sequelize.QueryTypes.SELECT
    });
  
    if(!quartiers){
       return next(new AppError('No quartiers found.', 404));
    }

    let quartiersInfos = [];
    
    for(const quartier of quartiers){
        console.log(quartier)
        let limites = await models.sequelize.query(
            "select lq.iat, lq.ing from limite_quartiers as lq where lq.qaurtier_id = :quartier ORDER BY lq.createdAt",
            {
                replacements: { quartier: quartier.id },
                type: models.sequelize.QueryTypes.SELECT
            });
        
        let obj = { ...quartier, limites }
        quartiersInfos.push(obj);
    }
  
    res.status(200).json({
        status: 'success',
        results: quartiersInfos.length,
        quartiers: quartiersInfos
    });
});

exports.consulter_tous_les_quartiers_par_commune = catchAsync(async (req, res, next) => {

    const quartiers = await models.sequelize.query(
    "select p.nom_fr as projet_nom_fr, p.nom_ar as projet_nom_ar, q.id, q.nom, q.iat, q.ing from projets as p, quartiers as q where p.id = q.projet_id and p.commune_id= :commune",
    {
        replacements: { commune: req.body.commune_id },
        type: models.sequelize.QueryTypes.SELECT
    });
  
    if(!quartiers){
       return next(new AppError('No quartiers found.', 404));
    }

    let quartiersInfos = [];
    
    for(const quartier of quartiers){
        console.log(quartier)
        let limites = await models.sequelize.query(
            "select lq.iat, lq.ing from limite_quartiers as lq where lq.qaurtier_id = :quartier ORDER BY lq.createdAt",
            {
                replacements: { quartier: quartier.id },
                type: models.sequelize.QueryTypes.SELECT
            });
        
        let obj = { ...quartier, limites }
        quartiersInfos.push(obj);
    }
  
    res.status(200).json({
        status: 'success',
        results: quartiersInfos.length,
        quartiers: quartiersInfos
    });
});

exports.consulter_quartier = catchAsync(async (req, res, next) => {
    const quartier = await models.Quartier.findByPk(req.params.id);
  
    if(!quartier){
      return next(new AppError('No quartier with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      quartier
   });
});

exports.ajout_quartier = catchAsync(async (req, res, next) => {

    const projet = await models.Projet.findByPk(req.params.projet_id);
  
    if(!projet){
       return next(new AppError('Projet not found with this ID', 404));
    }

    console.log(req.body);

   if(req.body.quartiers && req.body.quartiers.length > 0){
        req.body.quartiers.map(async (quartier) => {
            let nouveau_quartier = await models.Quartier.create({id: uuidv4(), nom: quartier.nom, projet_id: projet.id, iat: quartier.center.lat, ing: quartier.center.lng, superficie: 0});
            quartier.latlngs.forEach(async (latlng) => {
                let limite = await models.Limite_quartier.create({id: uuidv4(), qaurtier_id: nouveau_quartier.id, iat: latlng.lat, ing: latlng.lng});
            });
        });
    }
  
    res.status(201).json({
        status: 'success'
    });
});

exports.modifier_quartier = catchAsync(async(req, res, next) => {

    const utlisateur = await models.Quartier.update(req.body, { where: { id: req.params.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No quartier found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_quartier = catchAsync(async(req, res, next) => {

    const limites = await models.Limite_quartier.destroy({ where: { qaurtier_id: req.params.id } });

    const quartier = await models.Quartier.destroy({ where: { id: req.params.id } });
  
    if(!quartier){
       return next(new AppError('Invalid fields or No quartier found with this ID', 404));
    }

    res.status(203).json({
        status: 'success',
    });
});

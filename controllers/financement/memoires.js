const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.consulter_tous_les_memoires = catchAsync(async (req, res, next) => {

    const memoires = await models.Memoire.findAll({ include: { model: models.Bailleur_fonds, attributes: { exclude: ['createdAt','updatedAt','image'] } } });

    if(!memoires){
        return next(new AppError('No memoires found.', 404));
    }

    memoiresInfo = [];

    for(const memoire of memoires){
        let financements = await models.Financement.findAll({ 
            where: { memoire_id: memoire.id }, attributes: ['montant','type','id'],
            include: { model: models.Bailleur_fonds, attributes: ['nom','abreviation','id'] } });
        memoiresInfo.push({ memoire, financements });
    }
  
    res.status(200).json({
        status: 'success',
        results: memoiresInfo.length,
        memoiresInfo
    });

});

exports.consulter_memoire = catchAsync(async (req, res, next) => {

    const memoire = await models.Memoire.findByPk(req.params.id);
  
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

    const etat = await models.Bailleur_fonds.findOne({ where: { abreviation: "ETAT" } });

    console.log(nouveau_memoire.htv,nouveau_memoire.timbre_fiscale,nouveau_memoire.gestion_frais_tva);

    await models.Financement.create({
        id: uuidv4(), 
        montant: nouveau_memoire.htva + nouveau_memoire.frais_gestion,
        bailleur_id: nouveau_memoire.source_financement, 
        memoire_id: nouveau_memoire.id,
        type: "prévisionnel"});
    
    await models.Financement.create({
        id: uuidv4(),
        montant: nouveau_memoire.htva + nouveau_memoire.timbre_fiscale + nouveau_memoire.gestion_frais_tva,
        bailleur_id: etat.id,
        memoire_id: nouveau_memoire.id,
        type: "prévisionnel"});
    
    await models.Financement.create({ 
        id: uuidv4(), 
        bailleur_id: nouveau_memoire.source_financement,
        memoire_id: nouveau_memoire.id,
        type: "deblocage"});
            
    await models.Financement.create({
        id: uuidv4(),
        bailleur_id: etat.id,
        memoire_id: nouveau_memoire.id,
        type: "deblocage"});

    await models.Financement.create({
        id: uuidv4(), 
        montant: -(nouveau_memoire.htva + nouveau_memoire.frais_gestion),
        bailleur_id: nouveau_memoire.source_financement,
        memoire_id: nouveau_memoire.id,
        type: "reliquat"});
                
    await models.Financement.create({
        id: uuidv4(),
        montant: -(nouveau_memoire.htva + nouveau_memoire.timbre_fiscale + nouveau_memoire.gestion_frais_tva),
        bailleur_id: etat.id,
        memoire_id: nouveau_memoire.id,
        type: "reliquat"});
    
  
    res.status(201).json({
        status: 'success',
        nouveau_memoire
    });

});


exports.consult


exports.modifier_Memoire = catchAsync(async(req, res, next) => {

    const memoire = await models.Memoire.update(req.body, { where: { id: req.params.id } });
  
    if(!memoire){
       return next(new AppError('Invalid fields or No memoire found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_memoire = catchAsync(async(req, res, next) => {

    const memoire = await models.Memoire.destroy({ where: { id: req.params.id } });
  
    if(!memoire){
       return next(new AppError('Invalid fields or No memoire found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

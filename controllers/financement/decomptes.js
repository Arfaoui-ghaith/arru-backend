const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.consulter_tous_les_decomptes = catchAsync(async (req, res, next) => {

    const decomptes = await models.Decompte.findAll({
        include:[
            { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt','updatedAt'] } },
            { model: models.Prestataire, as: 'prestataire', attributes: { exclude: ['createdAt','updatedAt'] } }
        ],
        attributes: { exclude: ['createdAt','updatedAt', 'prestataire_id', 'memoire_id'] }
    });

    if(!decomptes){
        return next(new AppError('No decomptes found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: decomptes.length,
        decomptes
    });

});

exports.consulter_decompte = catchAsync(async (req, res, next) => {

    const decompte = await models.Decompte.findByPk(
        req.params.id,{
            include:[
                { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt','updatedAt'] } },
                { model: models.Prestataire, as: 'prestataire', attributes: { exclude: ['createdAt','updatedAt'] } }
            ],
            attributes: { exclude: ['createdAt','updatedAt', 'prestataire_id', 'memoire_id'] }
        });
  
    if(!decompte){
      return next(new AppError('No memoire with this ID.',404));
    }
   
    res.status(200).json({
      status: 'success',
      decompte
    });

});

exports.ajout_decompte = catchAsync(async (req, res, next) => {

    const nouveau_decompte = await models.Decompte.create({id: uuidv4(),...req.body});

    if(!nouveau_decompte){
        return next(new AppError('Invalid fields or duplicate decompte', 401));
    }

    const etat = await models.Bailleur_fonds.findOne({ where: { nom: "ETAT" } });

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

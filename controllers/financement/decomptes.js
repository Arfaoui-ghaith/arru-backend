const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const trace = require('./../access_permissions/traces');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.consulter_tous_les_decomptes = catchAsync(async (req, res, next) => {

    const decomptes = await models.Decompte.findAll({
        include:[
            { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt','updatedAt', 'projet_id'] },
            include: { model: models.Projet, as: 'projet', attributes: { exclude: ['createdAt','updatedAt'] } } },
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

    const decompte = await models.Decompte.findByPk(
        nouveau_decompte.id,{
            include:[
                { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt','updatedAt'] },
                    include: { model: models.Projet, as: 'projet' } },
                { model: models.Prestataire, as: 'prestataire', attributes: { exclude: ['createdAt','updatedAt'] } }
            ],
            attributes: { exclude: ['createdAt','updatedAt', 'prestataire_id', 'memoire_id'] }
        });

    await trace.ajout_trace(req.user, `Ajouter le decompte de la prestataire ${decompte.prestataire.abreviation} pour le projet ${decompte.memoire.projet.code}`);
  
    res.status(201).json({
        status: 'success',
    });

});


exports.modifier_decompte = catchAsync(async(req, res, next) => {

    const decompteInfo = await models.Decompte.findByPk(
        req.params.id,{
            include:[
                { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt','updatedAt'] },
                    include: { model: models.Projet, as: 'projet' } },
                { model: models.Prestataire, as: 'prestataire', attributes: { exclude: ['createdAt','updatedAt'] } }
            ],
            attributes: { exclude: ['createdAt','updatedAt', 'prestataire_id', 'memoire_id'] }
        });

    const decompte = await models.Decompte.update(req.body, { where: { id: req.params.id } });
  
    if(!decompte){
       return next(new AppError('Invalid fields or No decompte found with this ID', 404));
    }

    await trace.ajout_trace(req.user, `Ajouter le decompte de la prestataire ${decompteInfo.prestataire.abreviation} pour le projet ${decompte.memoire.projet.code}`);
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_decompte = catchAsync(async(req, res, next) => {

    const decompteInfo = await models.Decompte.findByPk(
        req.params.id,{
            include:[
                { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt','updatedAt'] },
                    include: { model: models.Projet, as: 'projet' } },
                { model: models.Prestataire, as: 'prestataire', attributes: { exclude: ['createdAt','updatedAt'] } }
            ],
            attributes: { exclude: ['createdAt','updatedAt', 'prestataire_id', 'memoire_id'] }
        });

    const decompte = await models.Decompte.destroy({ where: { id: req.params.id } });
  
    if(!decompte){
       return next(new AppError('Invalid fields or No decompte found with this ID', 404));
    }
  
    await trace.ajout_trace(req.user, `Supprimer le decompte de la prestataire ${decompteInfo.prestataire.abreviation} pour le projet ${decompte.memoire.projet.code}`);

    res.status(203).json({
        status: 'success',
    });
    
});

const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

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

exports.consulter_memoire = catchAsync(async (req, res, next) => {

    const memoire = await models.Memoire.findByPk(
        req.params.id,{
        include:[
            { model: models.Financement, attributes: { exclude: ['createdAt','updatedAt','image'] },
                include: { model: models.Bailleur_fonds, as: 'bailleur_fond', attributes: { exclude: ['createdAt','updatedAt','image'] } }
            },
            { model: models.Decompte, as: 'decompte', attributes: { exclude: ['createdAt','updatedAt','memoire_id','prestataire_id'] },
                include: { model: models.Prestataire, as: 'prestataire', attributes: { exclude: ['createdAt','updatedAt','memoire_id'] } } 
            },
            { model: models.Projet, as: 'projet', attributes: { exclude: ['createdAt','updatedAt'] } }
        ],
        attributes: { exclude: ['createdAt','updatedAt'] }
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

    const etat = await models.Bailleur_fonds.findOne({ where: { nom: "Etat" } });

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
            montant: (nouveau_memoire.tva + nouveau_memoire.timbre_fiscale + nouveau_memoire.gestion_frais_tva),
            bailleur_id: etat.id,
            memoire_id: nouveau_memoire.id,
            type: "deblocage"
        },
        {
            id: uuidv4(),
            montant: (nouveau_memoire.tva + nouveau_memoire.timbre_fiscale + nouveau_memoire.gestion_frais_tva),
            bailleur_id: etat.id,
            memoire_id: nouveau_memoire.id,
            type: "reliquat"
        },
    ]);
  
    res.status(201).json({
        status: 'success',
    });

});


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

    await models.Memoire.update({ projet_id: null}, { where: { id: req.params.id } })
    const memoire = await models.Memoire.destroy({ where: { id: req.params.id } });
  
    if(!memoire){
       return next(new AppError('Invalid fields or No memoire found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

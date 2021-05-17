const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.consulter_tous_les_financements = catchAsync(async (req, res, next) => {

    const financements = await models.Financement.findAll({attributes: { exclude: ['createdAt','updatedAt','bailleur_id'] }, include:{ model: models.Bailleur_fonds, attributes: { exclude: ['createdAt','updatedAt','image'] } } });
  
    if(!financements){
       return next(new AppError('No schemas_financements found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: financements.length,
        financements
    });

});

exports.consulter_financement = catchAsync(async (req, res, next) => {

    const financement = await models.Financement.findByPk(req.params.id);
  
    if(!financement){
      return next(new AppError('No financement with this ID.',404));
    }
   
    res.status(200).json({
      status: 'success',
      financement
    });

});

exports.ajout_financement = catchAsync(async (req, res, next) => {

    const nouveau_financement = await models.Financement.create({id: uuidv4(),...req.body, image: req.file.filename});
  
    if(!nouveau_financement){
        return next(new AppError('Invalid fields or duplicate financement', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_financement
    });

});

exports.modifier_financement = catchAsync(async(req, res, next) => {

    const financement = await models.Financement.update(req.body, { where: { id: req.params.id }, include: models.Bailleur_fonds });
  
    if(!financement){
       return next(new AppError('Invalid fields or No point found with this ID', 404));
    }

    if(financement.type === "prévisionnel" || financement.type === "deblocage"){
        console.log(financement);
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_financement = catchAsync(async(req, res, next) => {

    const financement = await models.Financement.destroy({ where: { id: req.params.id } });
  
    if(!financement){
       return next(new AppError('Invalid fields or No financement found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.consulter_tous_les_points = catchAsync(async (req, res, next) => {

    const points = await models.Point.findAll({});
  
    if(!points){
       return next(new AppError('No points found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: points.length,
        points
    });

});

exports.consulter_point = catchAsync(async (req, res, next) => {

    const point = await models.Point.findByPk(req.params.id);
  
    if(!point){
      return next(new AppError('No point with this ID.',404));
    }
   
    res.status(200).json({
      status: 'success',
      point
    });

});

exports.ajout_point = catchAsync(async (req, res, next) => {

    const nouveau_point = await models.Point.create({id: uuidv4(),...req.body});
  
    if(!nouveau_point){
        return next(new AppError('Invalid fields or duplicate point', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_point
    });

});

exports.modifier_point = catchAsync(async(req, res, next) => {

    const utlisateur = await models.Point.update(req.body, { where: { id: req.params.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No point found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_point = catchAsync(async(req, res, next) => {

    const point = await models.Point.destroy({ where: { id: req.params.id } });
  
    if(!point){
       return next(new AppError('Invalid fields or No point found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

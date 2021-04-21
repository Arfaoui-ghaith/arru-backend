const models = require('./../../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.consulter_tous_les_specifications = catchAsync(async (req, res, next) => {

    const specifications = await models.Specification.findAll({});
  
    if(!specifications){
       return next(new AppError('No specifications found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: specifications.length,
        specifications
    });
});

exports.consulter_specification = catchAsync(async (req, res, next) => {
    const specification = await models.Specification.findByPk(req.params.id);
  
    if(!specification){
      return next(new AppError('No specification with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      specification
   });
});

exports.ajout_specification = catchAsync(async (req, res, next) => {

    const nouveau_specification = await models.Specification.create({id: uuidv4(),...req.body});
  
    if(!nouveau_specification){
       return next(new AppError('Invalid fields or duplicate specification', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_specification
    });
});

exports.modifier_specification = catchAsync(async(req, res, next) => {

    const utlisateur = await models.Specification.update(req.body, { where: { id: req.params.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No specification found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_specification = catchAsync(async(req, res, next) => {

    const specification = await models.Specification.destroy({ where: { id: req.params.id } });
  
    if(!specification){
       return next(new AppError('Invalid fields or No specification found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
});

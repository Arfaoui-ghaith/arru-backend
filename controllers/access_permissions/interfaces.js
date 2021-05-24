const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.consulter_tous_les_interfaces = catchAsync(async (req, res, next) => {

    const interfaces = await models.Interface.findAll({});
  
    if(!interfaces){
       return next(new AppError('No interfaces found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: interfaces.length,
        interfaces
    });
    
});

exports.consulter_interface = catchAsync(async (req, res, next) => {

    const interface = await models.Interface.findByPk(req.params.id);
  
    if(!interface){
      return next(new AppError('No interface with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      interface
   });

});

exports.ajout_interface = catchAsync(async (req, res, next) => {

    const nouveau_interface = await models.Interface.create({id: uuidv4(), ...req.body});
  
    if(!nouveau_interface){
       return next(new AppError('Invalid fields or duplicate interface', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_interface
    });

});

exports.supprimer_interface = catchAsync(async(req, res, next) => {

    const interface = await models.Interface.destroy({ where: { id: req.params.id } });
  
    if(!interface){
       return next(new AppError('Invalid fields or No interface found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });

});
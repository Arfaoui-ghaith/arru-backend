const models = require('./../../models/index');
const codification = require('./../utils/codification');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');


exports.ajout_eau_potable = catchAsync(async (req, res, next) => {

    const nouveau_eau_potable = await models.Eau_potable.create({id: codification.codeEauPotable(req.body.infrastructure_id) ,...req.body});
  
    if(!nouveau_eau_potable){
       return next(new AppError('Invalid fields or duplicate eau_potable', 401));
    }
});

exports.modifier_eau_potable = catchAsync(async(req, res, next) => {

    const eau_potable = await models.Eau_potable.update(req.body, { where: { id: req.params.id } });
  
    if(!eau_potable){
       return next(new AppError('Invalid fields or No eau_potable found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

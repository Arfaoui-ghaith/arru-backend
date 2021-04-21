const models = require('./../../models/index');
const codification = require('./../utils/codification');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');


exports.ajout_assainissement = catchAsync(async (req, res, next) => {

    const nouveau_assainissement = await models.Assainissement.create({id: codification.codeAssainissement(req.body.infrastructure_id) ,...req.body});
  
    if(!nouveau_assainissement){
       return next(new AppError('Invalid fields or duplicate assainissement', 401));
    }
});

exports.modifier_assainissement = catchAsync(async(req, res, next) => {

    const assainissement = await models.Assainissement.update(req.body, { where: { id: req.params.id } });
  
    if(!assainissement){
       return next(new AppError('Invalid fields or No assainissement found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
});

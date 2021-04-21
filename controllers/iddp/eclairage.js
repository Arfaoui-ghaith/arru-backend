const models = require('../../models/index');
const codification = require('../utils/codification');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');


exports.ajout_eclairage = catchAsync(async (req, res, next) => {

    const nouveau_eclairage = await models.Eclairage.create({id: codification.codeEclairage(req.body.infrastructure_id) ,...req.body});
  
    if(!nouveau_eclairage){
       return next(new AppError('Invalid fields or duplicate eclairage', 401));
    }

});

exports.modifier_eclairage = catchAsync(async(req, res, next) => {

    const eclairage = await models.Eclairage.update(req.body, { where: { id: req.params.id } });
  
    if(!eclairage){
       return next(new AppError('Invalid fields or No eclairage found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

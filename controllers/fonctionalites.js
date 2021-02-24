const models = require('./../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.consulter_tous_les_fonctionalites = catchAsync(async (req, res, next) => {

    const fonctionalites = await models.Fonctionalité.findAll({});
  
    if(!fonctionalites){
       return next(new AppError('No roles found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: fonctionalites.length,
        fonctionalites
    });
    
});
const models = require('../../models/index');
const codification = require('../utils/codification');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');


exports.ajout_infrastructure = catchAsync(async (req, res, next) => {

    if(!req.projet){
        return next(new AppError('projet not found', 404));
    }

    if(!req.infrastructures){
        return next(new AppError('infrastructures not found', 404));
    }

    req.infrastructures.map(async (infra) => {
        await models.Infrastructure.create({id: codification.codeInfrastructure(req.projet, infra.type) , ...infra, projet_id: req.projet});
    })
    const infrastructures = await models.Infrastructure.findAll({ where: { projet_id: req.projet } });

    res.status(201).json({
        status: 'success',
        infrastructures
    });

});
const models = require('../../models/index');
const codification = require('../utils/codification');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');


exports.ajout_infrastructure = catchAsync(async (req, res, next) => {

    const etude = await models.Etude.create({ id: codification.codeEtude(req.projet), projet_id: req.projet, ...req.etude });

    req.infrastructures.map(async (infra) => {
        console.log({id: codification.codeInfrastructure(req.projet, infra.type) , ...infra, projet_id: req.projet});
        await models.Infrastructure.create({id: codification.codeInfrastructure(req.projet, infra.type) , ...infra, projet_id: req.projet});
    });

    //const infrastructures = await models.Infrastructure.findAll({ where: { projet_id: req.projet } });

    res.status(201).json({
        status: 'success',
        //infrastructures
    });

});

exports.update_infrastructure = catchAsync(async (req, res, next) => {

    const infrastructure = await models.Infrastructure.update(req.body, { where: { id: req.params.id } });
  
    if(!infrastructure){
       return next(new AppError('Invalid fields or No infrastructure found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
})
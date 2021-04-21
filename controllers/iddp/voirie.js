const models = require('./../../models/index');
const codification = require('./../utils/codification');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.ajout_voirie = catchAsync(async (req, res, next) => {

    const nouveau_voirie = await models.Voirie.create({id: codification.codeVoirie(req.body.infrastructure_id) ,...req.body});
  
    if(!nouveau_voirie){
       return next(new AppError('Invalid fields or duplicate voirie', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_voirie
    });
});

exports.modifier_voirie = catchAsync(async(req, res, next) => {

    const voirie = await models.Voirie.update(req.body, { where: { id: req.params.id } });
  
    if(!voirie){
       return next(new AppError('Invalid fields or No voirie found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

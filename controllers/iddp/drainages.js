const models = require('./../../models/index');
const codification = require('./../utils/codification');

const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.ajout_drainage = catchAsync(async (req, res, next) => {

    const nouveau_drainage = await models.Drainage.create({id: codification.codeDrainage(req.body.infrastructure_id) ,...req.body});
  
    if(!nouveau_drainage){
       return next(new AppError('Invalid fields or duplicate drainage', 401));
    }

});

exports.modifier_drainage = catchAsync(async(req, res, next) => {

    const drainage = await models.Drainage.update(req.body, { where: { id: req.params.id } });
  
    if(!drainage){
       return next(new AppError('Invalid fields or No drainage found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

const models = require('../../models/index');
const codification = require('../utils/codification');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');


exports.ajout_infrastructure = catchAsync(async (req, res, next) => {

    if(!req.projet){
        return next(new AppError('projet not found', 404));
    }

    const nouveau_infrastructure = await models.Infrastructure.create({id: codification.codeInfrastructure(req.projet) , projet_id: req.projet});
  
    if(!nouveau_infrastructure){ 
       return next(new AppError('Invalid fields or duplicate infrastructure', 401));
    }

    console.log(nouveau_infrastructure);

    if(req.infrastructure && req.infrastructure.drainage){
        await models.Drainage.create({ id: nouveau_infrastructure.id+'-'+'DR',infrastructure_id: nouveau_infrastructure.id, ...req.infrastructure.drainage })
    }

    if(req.infrastructure && req.infrastructure.assainissement){
        await models.Assainissement.create({ id: nouveau_infrastructure.id+'-'+'AS',infrastructure_id: nouveau_infrastructure.id, ...req.infrastructure.assainissement })
    }

    if(req.infrastructure && req.infrastructure.eau_potable){
        await models.Eau_potable.create({ id: nouveau_infrastructure.id+'-'+'EA',infrastructure_id: nouveau_infrastructure.id, ...req.infrastructure.eau_potable })
    }

    if(req.infrastructure && req.infrastructure.eclairage){
        await models.Eclairage_public.create({ id: nouveau_infrastructure.id+'-'+'EC',infrastructure_id: nouveau_infrastructure.id, ...req.infrastructure.eclairage })
    }

    if(req.infrastructure && req.infrastructure.voirie){
        await models.Voirie.create({ id: nouveau_infrastructure.id+'-'+'VO',infrastructure_id: nouveau_infrastructure.id, ...req.infrastructure.voirie })
    }

    res.status(203).json({
        status: 'success',
    });

});
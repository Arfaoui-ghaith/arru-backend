const models = require('./../../models/index');
const { v4: uuidv4 } = require('uuid');

const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.consulter_tous_les_gouvernorats = catchAsync(async (req, res, next) => {

    const gouvernorats = await models.Gouvernorat.findAll({
        include: { model: models.Commune, attributes: { exclude: ['createdAt', 'updatedAt'] } },
        attributes: { exclude: ['commune_id', 'createdAt', 'updatedAt'] }
    });
  
    if(!gouvernorats){
       return next(new AppError('No gouvernorats found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: gouvernorats.length,
        gouvernorats
    });
});

exports.consulter_gouvernorat = catchAsync(async (req, res, next) => {
    const gouvernorat = await models.Gouvernorat.findByPk(req.params.id, {
        include: { model: models.Commune, attributes: { exclude: ['createdAt', 'updatedAt'] } },
        attributes: { exclude: ['commune_id', 'createdAt', 'updatedAt'] }
    });
  
    if(!gouvernorat){
      return next(new AppError('No gouvernorat with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      gouvernorat
   });
});


const models = require('./../../models/index');
const { v4: uuidv4 } = require('uuid');

const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.consulter_tous_les_gouvernorats = catchAsync(async (req, res, next) => {
    const gouvernorats = await models.Gouvernorat.findAll({
        include:[
            { model: models.Fiche_criteres, as: 'fiche_criteres', attributes: { exclude: ['createdAt', 'updatedAt'] } },
            { model: models.Commune, as: 'communes', attributes: { exclude: ['createdAt', 'updatedAt'] }, 
                include: { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updatedAt']},
                    include: [
                        { model: models.Point, as: 'center', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } },
                        { model: models.Point, as: 'latlngs', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } }
                    ]
                }
            }
        ],
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
    const gouvernorat = await models.Gouvernorat.findAll({
        where: { id: req.params.id },
        include:[
            { model: models.Fiche_criteres, as: 'fiche_criteres', attributes: { exclude: ['createdAt', 'updatedAt'] } },
            { model: models.Commune, as: 'communes', attributes: { exclude: ['createdAt', 'updatedAt'] } }
        ],
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



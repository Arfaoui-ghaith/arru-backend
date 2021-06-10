const models = require('./../../models/index');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('../utils/codification');
const { v4: uuidv4 } = require('uuid');

exports.consulter_tous_les_progres = catchAsync(async (req, res, next) => {

    const projets = await models.Projet.findAll({
        include: { model: models.Infrastructure, as: 'infrastructures', attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: { model: models.Progres, as: 'progres', attributes: { exclude: ['createdAt', 'updatedAt'] } } },
        attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] }
    });
    
    if(!projets){
       return next(new AppError('No progres found.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: projets.length,
        projets
    });

});

exports.consulter_progres_par_projet = catchAsync(async (req, res, next) => {

    const projet = await models.Projet.findByPk(req.params.id, {
        include: { model: models.Infrastructure, as: 'infrastructures', attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: { model: models.Progres, as: 'progres', attributes: { exclude: ['createdAt', 'updatedAt'] } } },
        attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] }
    });
  
    if(!projet){
        return next(new AppError('No projet with this ID.',404));
    }
   
    res.status(200).json({
        status: 'success',
        projet
    });

});

exports.modifier_progres = catchAsync(async(req, res, next) => {

    const progres = await models.Progres.update(req.body, { where: { id: req.params.id } });
  
    if(!progres){
       return next(new AppError('Invalid fields or No progres found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

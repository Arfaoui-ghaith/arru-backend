const models = require('./../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.consulter_tous_les_utilisateurs_roles = catchAsync(async (req, res, next) => {

    const utilisateurs_roles = await models.Utilisateures_roles.findAll({});
  
    if(!utilisateurs_roles){
       return next(new AppError('No fonctionalites_roles found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: utilisateurs_roles.length,
        utilisateurs_roles
    });
    
});

exports.consulter_utilisateur_role = catchAsync(async (req, res, next) => {

    const utilisateur_role = await models.Utilisateures_roles.findByPk(req.params.id);
  
    if(!utilisateur_role){
      return next(new AppError('No fonctionalite_role with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      utilisateur_role
   });

});

exports.ajout_utilisateur_role = catchAsync(async (req, res, next) => {

    const nouveau_utilisateur_role = await models.Utilisateures_roles.create({id: uuidv4(), ...req.body});
  
    if(!nouveau_utilisateur_role){
       return next(new AppError('Invalid fields or duplicate utilisateur_role', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_utilisateur_role
    });

});

exports.modifier_utilisateur_role = catchAsync(async(req, res, next) => {

    const utilisateur_role = await models.Utilisateures_roles.update(req.body, { where: { id: req.params.id } });
  
    if(!utilisateur_role){
       return next(new AppError('Invalid fields or No utilisateur_role found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_utilisateures_roles = catchAsync(async(req, res, next) => {

    const utilisateur_role = await models.Utilisateures_roles.destroy({ where: { id: req.params.id } });
  
    if(!utilisateur_role){
       return next(new AppError('Invalid fields or No utilisateur_role found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });

});

exports.creer_utilisateures_roles_relations = catchAsync(async(req, res, next) => {

    await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    const delete_relations = await models.Utilisateures_roles.destroy({ where: { utilisateur_id: req.utilisateur_id } });

    await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  
    if(!delete_relations){
       return next(new AppError('Invalid fields or No utilisateur_id found with this ID', 404));
    }

    const relations = await models.Utilisateures_roles.bulkCreate(req.relations, {returning: true});
  
    if(!relations){
       return next(new AppError('No relations created', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });

});
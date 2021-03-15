const models = require('./../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.consulter_tous_les_fonctionalites_roles = catchAsync(async (req, res, next) => {

    const fonctionalites_roles = await models.Roles_fonctionalités.findAll({});
  
    if(!fonctionalites_roles){
       return next(new AppError('No fonctionalites_roles found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: fonctionalites_roles.length,
        fonctionalites_roles
    });
    
});

exports.consulter_fonctionalite_role = catchAsync(async (req, res, next) => {

    const fonctionalite_role = await models.Roles_fonctionalités.findByPk(req.params.id);
  
    if(!fonctionalite_role){
      return next(new AppError('No fonctionalite_role with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      fonctionalite_role
   });

});

exports.ajout_fonctionalite_role = catchAsync(async (req, res, next) => {

    if(!req.role || !req.fonctionalites){

    const nouveau_fonctionalite = await models.Roles_fonctionalités.create({id: uuidv4(), ...req.body});
  
    if(!nouveau_fonctionalite){
       return next(new AppError('Invalid fields or duplicate fonctionalite_role', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_fonctionalite
    });
    
    } else {
        req.fonctionalites.forEach( async (fonctionalite, index) => {
            let fonctionalite_role = await models.Roles_fonctionalités.create({id: uuidv4(), role_id: req.role.id, fonctionalite_id: fonctionalite});
        });

        res.status(201).json({
            status: 'success',
        });
    }

});

exports.modifier_fonctionalite_role = catchAsync(async(req, res, next) => {

    if(req.relations){
        req.body = req.relations;
    }

    const fonctionalite_role = await models.Roles_fonctionalités.update(req.body, { where: { id: req.params.id } });
  
    if(!fonctionalite_role){
       return next(new AppError('Invalid fields or No fonctionalite_role found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_fonctionalite_role = catchAsync(async(req, res, next) => {

    const fonctionalite = await models.Roles_fonctionalités.destroy({ where: { id: req.params.id } });
  
    if(!fonctionalite){
       return next(new AppError('Invalid fields or No fonctionalite_role found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });

});
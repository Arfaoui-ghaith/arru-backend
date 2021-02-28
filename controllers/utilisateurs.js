const models = require('./../models/index');
const { v4: uuidv4 } = require('uuid');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const bcrypt = require('bcryptjs');

exports.consulter_tous_les_utilisateurs = catchAsync(async (req, res, next) => {

    const utilisateurs = await models.Utilisateur.findAll({});
  
    if(!utilisateurs){
       return next(new AppError('No users found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: utilisateurs.length,
        utilisateurs
    });
});

exports.consulter_utilisateur = catchAsync(async (req, res, next) => {
    const utilisateur = await models.Utilisateur.findByPk(req.params.id);
  
    if(!utilisateur){
      return next(new AppError('No user with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      utilisateur
   });
});

exports.ajout_utilisateur = catchAsync(async (req, res, next) => {

    if(req.body.password){
        const password = await bcrypt.hash(req.body.password, 12);
        req.body.password = password;
    }

    const nouveau_utlisateur = await models.Utilisateur.create({id: uuidv4(), ...req.body });
  
    if(!nouveau_utlisateur){
       return next(new AppError('Invalid fields or duplicate user', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_utlisateur
    });
});

exports.modifier_utilisateur = catchAsync(async(req, res, next) => {

    if(req.body.password){
        const password = await bcrypt.hash(req.body.password, 12);
        req.body.password = password;
    }

    const utlisateur = await models.Utilisateur.update(req.body, { where: { id: req.params.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No user found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.modifier_profile = catchAsync(async(req, res, next) => {

    if(req.file.filename){
        req.body.image = req.file.filename;
    }

    if(req.body.password){
        const password = await bcrypt.hash(req.body.password, 12);
        req.body.password = password;
    }

    const utlisateur = await models.Utilisateur.update(req.body, { where: { id: req.user.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No user found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_utilisateur = catchAsync(async(req, res, next) => {

    const utlisateur = await models.Utilisateur.destroy({ where: { id: req.params.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No user found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
});
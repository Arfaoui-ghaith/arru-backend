const models = require('./../models/index');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const bcrypt = require('bcryptjs');
const catchAsync = require('./../utils/catchAsync');
const { QueryTypes } = require('sequelize');

const signToken = (utilisateur) => {
    return jwt.sign({ payload: {
        id: utilisateur.id,
        cin: utilisateur.cin, 
        nom: utilisateur.nom, 
        prenom: utilisateur.prenom, 
        email: utilisateur.email, 
        telephone: utilisateur.telephone, 
        image: utilisateur.image} }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.protect = catchAsync(async (req, res, next) => {
    
    let token;
    if ( req.headers.authorization.startsWith('Bearer') ) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged In ! Please log in to get access.', 401)
      );
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    
    const freshUser = await models.Utilisateur.findByPk(decoded.payload.id);

    if (!freshUser) {
      return next(
        new AppError('The user belonging to this token does not exist.', 401)
      );
    }

    req.user = freshUser;

    next();
});

exports.restrictTo = (fonctionalite) => {
    return async (req, res, next) => {

        const roles = await models.sequelize.query(
            "SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_fonctionalités` as rf, `fonctionalités` as f "
            +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = rf.role_id AND rf.fonctionalite_id = f.id AND f.titre = :fonctionalite",
            { 
                replacements: { utilisateur: req.user.id, fonctionalite },
                type: models.sequelize.QueryTypes.SELECT 
            }
        );

        console.log(roles);

        if (!roles) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }

        next();
    };
};

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email) {
        return next(
            new AppError('Please provide a email!', 400)
        );
    }else if(!password) {
        return next(
            new AppError('Please provide a password!', 400)
        );
    }
  
    const utilisateur = await models.Utilisateur.findOne({ where: { email } });
  
    if (!utilisateur) {
        return next(new AppError('Incorrect email! please try again.', 401));
    }else if (!(await bcrypt.compare(password, utilisateur.password))){
        return next(new AppError('Incorrect password! please try again.', 401));
    }

    const token = signToken(utilisateur);

    res.status(200).json({
        status: 'success',
        token
    });
});
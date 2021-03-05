const models = require('./../models/index');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const bcrypt = require('bcryptjs');
const catchAsync = require('./../utils/catchAsync');
const { QueryTypes } = require('sequelize');
const sendEmail = require('./../utils/email');

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
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
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

        if (roles.length == 0) {
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

exports.forgotPassword = catchAsync(async (req, res, next) => {
    console.log(req.body.email);
    // 1) Get user based on Posted email address
    const utilisateur = await models.Utilisateur.findOne({ where: { email: req.body.email } });
    if (!utilisateur) {
      return next(new AppError('There is no user with this email address.', 404));
    }
    // 2) Generate the random reset Token
    const resetToken = jwt.sign({ payload: { id: utilisateur.id } }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    
    // 3) Send it to user's email
  
    try {

      const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
  
      //await new Email(utilisateur, resetURL).sendPasswordReset();

      await sendEmail({
        email: utilisateur.email,
        subject: 'Hello from the other side !!',
        message: resetURL
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
        resetToken
      });
      
    } catch (err) {

      return next(
        new AppError('There was an error sending the email. Try again later.', 500)
      );

    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {

  let token;
  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token){
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);


  if (decoded) {
    if( new Date(decoded.exp * 1000) < new Date() ){
      return next(new AppError('Token has expired'), 400);
    }
  }else{
      return next(new AppError('Token invalid'), 400);
  }

  const password = await bcrypt.hash(req.body.password, 12);

  const utlisateur = await models.Utilisateur.update({ password }, { where: { id: decoded.payload.id } });

  if(!utlisateur){
    return next(new AppError('Invalid fields or No user found with this ID', 404));
  }

  res.status(203).json({
    status: 'success',
  });

});
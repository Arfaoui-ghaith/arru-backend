const express = require('express');
const router = express.Router();

const utilisateurController = require('./../../controllers/access_permissions/utilisateurs.js');
const authController = require('./../../controllers/access_permissions/authController');
const imageEditAndSave = require('./../../utils/imageEditAndSave');

router.route('/:id')
    .get(authController.restrictTo('consulter les utilisateurs'), utilisateurController.consulter_utilisateur);

router.route('/login').post(authController.login);

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword').post(authController.resetPassword);

//router.use(authController.protect);

router.route('/')
    .get(/*authController.restrictTo('consulter les utilisateurs'),*/ utilisateurController.consulter_tous_les_utilisateurs)
    .post(authController.restrictTo('ajouter un utilisateur'), utilisateurController.ajout_utilisateur);

router.route('/modifierProfile')
    .put(
        imageEditAndSave.uploadUserPhoto,
        imageEditAndSave.resizeUserPhoto,
        utilisateurController.modifier_profile);

router.route('/modifierMotDePasse')
    .put(utilisateurController.update_password);

router.route('/:id')
    .put(authController.restrictTo('modifier un utilisateur'), utilisateurController.modifier_utilisateur)
    .delete(authController.restrictTo('supprimer un utilisateur'), utilisateurController.supprimer_utilisateur);

module.exports = router;
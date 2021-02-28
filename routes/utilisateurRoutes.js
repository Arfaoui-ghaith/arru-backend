const express = require('express');
const router = express.Router();

const utilisateurController = require('./../controllers/utilisateurs.js');
const authController = require('./../controllers/authController');
const imageEditAndSave = require('./../utils/imageEditAndSave');

router.route('/login')
    .post(authController.login);

router.use(authController.protect);

router.route('/')
    .get(authController.restrictTo('consulter tous les utilisateurs'), utilisateurController.consulter_tous_les_utilisateurs)
    .post(utilisateurController.ajout_utilisateur);

router.route('/modifierProfile')
    .put(
        imageEditAndSave.uploadUserPhoto,
        imageEditAndSave.resizeUserPhoto,
        utilisateurController.modifier_utilisateur);

router.route('/:id')
    .get(utilisateurController.consulter_utilisateur)
    .put(utilisateurController.modifier_utilisateur)
    .delete(utilisateurController.supprimer_utilisateur);


module.exports = router;
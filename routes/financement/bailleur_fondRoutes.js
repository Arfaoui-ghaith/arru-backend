const express = require('express');
const router = express.Router();

const bailleur_fondController = require('./../../controllers/financement/bailleur_fonds');
const authController = require('../../controllers/access_permissions/authController');
const imageEditAndSave = require('./../../utils/imageEditAndSave');

router.use(authController.protect);

router.route('/')
    .get(authController.restrictTo('consulter les bailleurs'), bailleur_fondController.consulter_tous_les_bailleur_fonds)
    .post(
        authController.restrictTo('ajouter bailleur'),
        imageEditAndSave.uploadBailleurPhoto,
        imageEditAndSave.resizeBailleurPhoto,
        bailleur_fondController.ajout_bailleur_fond);

router.route('/:id')
    .get(bailleur_fondController.consulter_bailleur_fond)
    .put(
        authController.restrictTo('modifier bailleur'),
        imageEditAndSave.uploadBailleurPhoto,
        imageEditAndSave.resizeBailleurPhoto,
        bailleur_fondController.modifier_bailleur_fond)
    .delete(authController.restrictTo('supprimer bailleur'), bailleur_fondController.supprimer_bailleur_fond);

module.exports = router;
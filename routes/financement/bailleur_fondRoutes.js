const express = require('express');
const router = express.Router();

const bailleur_fondController = require('./../../controllers/financement/bailleur_fonds');
const authController = require('../../controllers/access_permissions/authController');
const imageEditAndSave = require('./../../utils/imageEditAndSave');

//router.use(authController.protect);

router.route('/')
    .get(bailleur_fondController.consulter_tous_les_bailleur_fonds)
    .post(
        imageEditAndSave.uploadBailleurPhoto,
        imageEditAndSave.resizeBailleurPhoto,
        bailleur_fondController.ajout_bailleur_fond);

router.route('/:id')
    .get(bailleur_fondController.consulter_bailleur_fond)
    .put(
        imageEditAndSave.uploadBailleurPhoto,
        imageEditAndSave.resizeBailleurPhoto,
        bailleur_fondController.modifier_bailleur_fond)
    .delete(bailleur_fondController.supprimer_bailleur_fond);

module.exports = router;
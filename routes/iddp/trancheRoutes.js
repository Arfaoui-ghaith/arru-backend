const express = require('express');
const router = express.Router();

const trancheController = require('../../controllers/iddp/tranches');
const authController = require('./../../controllers/access_permissions/authController');

router.use(authController.protect);

router.route('/')
    .get(authController.restrictTo('consulter les tranches'), trancheController.consulter_tous_les_tranches)
    .post(authController.restrictTo('ajouter tranche'), trancheController.ajout_tranche);

router.route('/:id')
    .get(trancheController.consulter_tranche)
    .put(authController.restrictTo('modifier tranche'), trancheController.modifier_tranche)
    .delete(authController.restrictTo('supprimer tranche'), trancheController.supprimer_tranche);

module.exports = router;
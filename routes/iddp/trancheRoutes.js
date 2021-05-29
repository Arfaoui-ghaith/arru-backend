const express = require('express');
const router = express.Router();

const trancheController = require('../../controllers/iddp/tranches');
const authController = require('./../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(trancheController.consulter_tous_les_tranches)
    .post(trancheController.ajout_tranche);

router.route('/:id')
    .get(trancheController.consulter_tranche)
    .put(trancheController.modifier_tranche)
    .delete(trancheController.supprimer_tranche);

module.exports = router;
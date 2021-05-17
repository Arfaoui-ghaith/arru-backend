const express = require('express');
const router = express.Router();

const financementController = require('./../../controllers/financement/financements');
const authController = require('../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(financementController.consulter_tous_les_financements)
    .post(financementController.ajout_financement);

router.route('/:id')
    .get(financementController.consulter_financement)
    .put(financementController.modifier_financement)
    .delete(financementController.supprimer_financement);

module.exports = router;
const express = require('express');
const router = express.Router();

const critereController = require('./../../controllers/iddp/criteres');
const authController = require('./../../controllers/access_permissions/authController');

router.use(authController.protect);

router.route('/test_eligible')
    .get(authController.restrictTo('test eligibilite'), critereController.test_eligible);

router.route('/')
    .get(critereController.consulter_tous_les_criteres)
    .post(critereController.ajout_critere);

router.route('/:id')
    .get(critereController.consulter_critere)
    .put(authController.restrictTo('modifier fiche des criteres'), critereController.modifier_critere);
    
module.exports = router;
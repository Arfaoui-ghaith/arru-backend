const express = require('express');
const router = express.Router();

const zone_interventionController = require('./../../controllers/iddp/zone_interventions');
const authController = require('./../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(zone_interventionController.consulter_tous_les_zone_interventions)
    .post(zone_interventionController.ajout_zone_intervention);

router.route('/:id')
    .get(zone_interventionController.consulter_zone_intervention)
    .put(zone_interventionController.modifier_zone_intervention);

module.exports = router;
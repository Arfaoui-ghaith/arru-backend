const express = require('express');
const router = express.Router();

const projetController = require('./../../controllers/iddp/projets');
const infrastructureController = require('./../../controllers/iddp/infrastructures');
const authController = require('./../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(projetController.consulter_tous_les_projets)
    .post(projetController.ajout_projet, infrastructureController.ajout_infrastructure);

router.route('/:id')
    .get(projetController.consulter_projet)
    .put(projetController.modifier_projet);


module.exports = router;
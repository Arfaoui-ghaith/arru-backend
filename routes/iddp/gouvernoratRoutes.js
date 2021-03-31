const express = require('express');
const router = express.Router();

const gouvernoratController = require('./../../controllers/iddp/gouvernorats');
const authController = require('./../../controllers/authController');

//router.use(authController.protect);

router.route('/')
    .get(gouvernoratController.consulter_tous_les_gouvernorats)
    .post(gouvernoratController.ajout_gouvernorat);

router.route('/:id')
    .get(gouvernoratController.consulter_gouvernorat)
    .put(gouvernoratController.modifier_gouvernorat)
    .delete(gouvernoratController.supprimer_gouvernorat);

router.route('/:id/communes')
    .get(gouvernoratController.consulter_les_communes_par_gouvernorat)

router.route('/:id/projets')
    .get(gouvernoratController.consulter_les_projets_par_gouvernorat);

module.exports = router;
const express = require('express');
const router = express.Router();

const projetController = require('./../../controllers/iddp/projets');
const authController = require('./../controllers/authController');

router.use(authController.protect);

router.route('/')
    .get(projetController.consulter_tous_les_projets)
    .post(projetController.ajout_projet);

router.route('/:id')
    .get(projetController.consulter_projet)
    .put(projetController.modifier_projet)
    .delete(projetController.supprimer_projet);


module.exports = router;
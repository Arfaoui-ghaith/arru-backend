const express = require('express');
const router = express.Router();

const municipaliteController = require('./../../controllers/iddp/municipalites');
const authController = require('./../controllers/authController');

router.use(authController.protect);

router.route('/')
    .get(municipaliteController.consulter_tous_les_municipalites)
    .post(municipaliteController.ajout_municipalite);

router.route('/:id')
    .get(municipaliteController.consulter_municipalite)
    .put(municipaliteController.modifier_municipalite)
    .delete(municipaliteController.supprimer_municipalite);


module.exports = router;
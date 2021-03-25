const express = require('express');
const router = express.Router();

const quartierController = require('./../../controllers/iddp/quartiers');
const authController = require('./../controllers/authController');

router.use(authController.protect);

router.route('/')
    .get(quartierController.consulter_tous_les_quartiers)
    .post(quartierController.ajout_quartier);

router.route('/:id')
    .get(quartierController.consulter_quartier)
    .put(quartierController.modifier_quartier)
    .delete(quartierController.supprimer_quartier);


module.exports = router;
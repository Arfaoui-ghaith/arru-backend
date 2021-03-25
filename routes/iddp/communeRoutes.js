const express = require('express');
const router = express.Router();

const communeController = require('./../../controllers/iddp/communes');
const authController = require('./../controllers/authController');

router.use(authController.protect);

router.route('/')
    .get(communeController.consulter_tous_les_communes)
    .post(communeController.ajout_commune);

router.route('/:id')
    .get(communeController.consulter_commune)
    .put(communeController.modifier_commune)
    .delete(communeController.supprimer_commune);


module.exports = router;
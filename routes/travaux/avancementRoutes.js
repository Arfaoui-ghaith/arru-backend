const express = require('express');
const router = express.Router();

const avancementController = require('../../controllers/Travaux/avancements');
const authController = require('./../../controllers/access_permissions/authController');

router.use(authController.protect);

router.route('/')
    .post(avancementController.ajout_progres);

router.route('/:id')
    .put(avancementController.modifier_progres)
    .delete(avancementController.supprimer_progres);

module.exports = router;
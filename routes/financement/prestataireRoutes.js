const express = require('express');
const router = express.Router();

const prestataireController = require('./../../controllers/financement/prestataires');
const authController = require('../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(prestataireController.consulter_tous_les_prestataires)
    .post(prestataireController.ajout_prestataire);

router.route('/:id')
    .get(prestataireController.consulter_prestataire)
    .put(prestataireController.modifier_prestataire)
    .delete(prestataireController.supprimer_prestataire);

module.exports = router;
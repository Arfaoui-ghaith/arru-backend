const express = require('express');
const router = express.Router();

const prestataireController = require('./../../controllers/financement/prestataires');
const authController = require('../../controllers/access_permissions/authController');

router.use(authController.protect);

router.route('/')
    .get(authController.restrictTo('consulter les prestataires'), prestataireController.consulter_tous_les_prestataires)
    .post(authController.restrictTo('ajouter prestataire'), prestataireController.ajout_prestataire);

router.route('/:id')
    .get(prestataireController.consulter_prestataire)
    .put(authController.restrictTo('modifier prestataire'), prestataireController.modifier_prestataire)
    .delete(authController.restrictTo('supprimer prestataire'), prestataireController.supprimer_prestataire);

module.exports = router;
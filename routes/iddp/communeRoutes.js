const express = require('express');
const router = express.Router();

const communeController = require('../../controllers/iddp/communes');
const authController = require('./../../controllers/access_permissions/authController');

router.use(authController.protect);

router.route('/')
    .get(authController.restrictTo('consulter les communes'), communeController.consulter_tous_les_communes)
    .post(authController.restrictTo('ajouter commune'), communeController.ajout_commune);

router.route('/:id')
    .get(communeController.consulter_commune)
    .put(authController.restrictTo('modifier commune'), communeController.modifier_commune)
    .delete(authController.restrictTo('supprimer commune'), communeController.supprimer_commune);

router.route('/:id/projets')
    .get(communeController.consulter_les_projets_par_commune);

module.exports = router;
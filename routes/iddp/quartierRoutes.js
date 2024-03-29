const express = require('express');
const router = express.Router();

const quartierController = require('./../../controllers/iddp/quartiers');
const authController = require('./../../controllers/access_permissions/authController');

router.use(authController.protect);

router.route('/')
    .get(authController.restrictTo('consulter les quartiers'), quartierController.consulter_tous_les_quartiers)
    .post(authController.restrictTo('ajouter quartier'), quartierController.ajout_quartier);

router.route('/sans_projet')
    .get(quartierController.consulter_tous_les_quartiers_sans_projets);

router.route('/gouvernorat/:id')
    .get(quartierController.consulter_tous_les_quartiers_par_gouvernourat);

router.route('/commune/:id')
    .get(quartierController.consulter_tous_les_quartiers_par_commune);

router.route('/:id')
    .get(quartierController.consulter_quartier)
    .put(authController.restrictTo('modifier quartier'), quartierController.modifier_quartier)
    .delete(authController.restrictTo('supprimer quartier'), quartierController.supprimer_quartier);


module.exports = router;
const express = require('express');
const router = express.Router();

const projetController = require('./../../controllers/iddp/projets');
const authController = require('./../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(projetController.consulter_tous_les_projets)
    .post(projetController.ajout_projet);

router.route('/sans_memoire')
    .get(projetController.consulter_tous_les_projets_sans_memoire);

router.route('/eligible')
    .get(projetController.consulter_les_projets_eligible);

router.route('/ineligible')
    .get(projetController.consulter_les_projets_ineligible);

router.route('/:id')
    .get(projetController.consulter_projet)
    .put(projetController.modifier_projet)
    .delete(projetController.supprimer_projet);


module.exports = router;
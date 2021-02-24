const express = require('express');
const router = express.Router();

const utilisateurController = require('./../controllers/utilisateurs.js');


router.route('/')
    .get(utilisateurController.consulter_tous_les_utilisateurs)
    .post(utilisateurController.ajout_utilisateur);

router.route('/:id')
    .get(utilisateurController.consulter_utilisateur)
    .put(utilisateurController.modifier_utilisateur)
    .delete(utilisateurController.supprimer_utilisateur);


module.exports = router;
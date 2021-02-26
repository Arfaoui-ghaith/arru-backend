const express = require('express');
const router = express.Router();

const utilisateur_roleController = require('../controllers/utilisateurs_roles');


router.route('/')
    .get(utilisateur_roleController.consulter_tous_les_utilisateurs_roles)
    .post(utilisateur_roleController.ajout_utilisateur_role);

router.route('/:id')
    .get(utilisateur_roleController.consulter_utilisateur_role)
    .put(utilisateur_roleController.modifier_utilisateur_role)
    .delete(utilisateur_roleController.supprimer_utilisateures_roles);

    
module.exports = router;
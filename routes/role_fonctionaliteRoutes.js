const express = require('express');
const router = express.Router();

const role_fonctionaliteController = require('./../controllers/fonctionalites_roles');


router.route('/')
    .get(role_fonctionaliteController.consulter_tous_les_fonctionalites_roles)
    .post(role_fonctionaliteController.ajout_fonctionalite_role);

router.route('/:id')
    .get(role_fonctionaliteController.consulter_fonctionalite_role)
    .put(role_fonctionaliteController.modifier_fonctionalite_role)
    .delete(role_fonctionaliteController.supprimer_fonctionalite_role);

    
module.exports = router;
const express = require('express');
const router = express.Router();

const role_specificationController = require('../controllers/roles_specifications');


router.route('/')
    .get(role_specificationController.consulter_tous_les_roles_specifications)
    .post(role_specificationController.ajout_role_specification);

router.route('/:id')
    .get(role_specificationController.consulter_role_specification)
    .put(role_specificationController.modifier_role_specification)
    .delete(role_specificationController.supprimer_role_specification);

    
module.exports = router;
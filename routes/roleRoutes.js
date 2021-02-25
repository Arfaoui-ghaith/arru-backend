const express = require('express');
const router = express.Router();

const roleController = require('./../controllers/roles');


router.route('/')
    .get(roleController.consulter_tous_les_roles)
    .post(roleController.ajout_role);

router.route('/:id')
    .get(roleController.consulter_role)
    .put(roleController.modifier_role)
    .delete(roleController.supprimer_role);


module.exports = router;
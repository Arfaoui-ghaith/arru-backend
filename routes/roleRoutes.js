const express = require('express');
const router = express.Router();

const roleController = require('./../controllers/roles');
const authController = require('./../controllers/authController');

router.use(authController.protect);

router.route('/')
    .get(roleController.consulter_tous_les_roles)
    .post(roleController.ajout_role);

router.route('/:id')
    .get(roleController.consulter_role)
    .put(roleController.modifier_role)
    .delete(roleController.supprimer_role);


module.exports = router;
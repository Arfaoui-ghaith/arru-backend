const express = require('express');
const router = express.Router();

const roleController = require('./../../controllers/access_permissions/roles');
const fonctionalites_rolesController = require('./../../controllers/access_permissions/fonctionalites_roles');

const authController = require('./../../controllers/access_permissions/authController');

router.use(authController.protect);

router.route('/')
    .get(/*authController.restrictTo('consulter les roles'),*/ roleController.consulter_tous_les_roles)
    .post(/*authController.restrictTo('ajouter des roles'),*/ roleController.ajout_role);

router.route('/:id')
    .get(/*authController.restrictTo('consulter les roles'),*/ roleController.consulter_role)
    .put(/*authController.restrictTo('modifier des roles'),*/ roleController.modifier_role)
    .delete(/*authController.restrictTo('supprimer des roles'),*/ roleController.supprimer_role);


module.exports = router;
const express = require('express');
const router = express.Router();

const roleController = require('./../../controllers/access_permissions/roles');
const fonctionalites_rolesController = require('./../../controllers/access_permissions/fonctionalites_roles');

const authController = require('./../../controllers/access_permissions/authController');

router.use(authController.protect);

router.route('/')
    .get(/*authController.restrictTo("consulter les roles"),*/ roleController.consulter_tous_les_roles)
    .post(authController.restrictTo('ajouter un role'), roleController.ajout_role);

router.route('/:id')
    .get(authController.restrictTo('consulter les roles'), roleController.consulter_role)
    .put(authController.restrictTo('modifier un role'), roleController.modifier_role)
    .delete(authController.restrictTo('supprimer un role'), roleController.supprimer_role);

module.exports = router;
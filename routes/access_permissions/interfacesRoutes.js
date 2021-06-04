const express = require('express');
const router = express.Router();

const interfaceController = require('./../../controllers/access_permissions/interfaces');
const authController = require('./../../controllers/access_permissions/authController');

router.use(authController.protect);

router.route('/')
    .get(authController.restrictTo("consulter les interfaces") ,interfaceController.consulter_tous_les_interfaces)
    .post(interfaceController.ajout_interface);

router.route('/:id')
    .get(authController.restrictTo("consulter les interfaces"),interfaceController.consulter_interface);


module.exports = router;
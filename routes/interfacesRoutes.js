const express = require('express');
const router = express.Router();

const interfaceController = require('./../controllers/iterfaces');
const authController = require('./../controllers/authController');

//router.use(authController.protect);

router.route('/')
    .get(interfaceController.consulter_tous_les_interfaces)
    .post(interfaceController.ajout_interface);

router.route('/:id')
    .get(interfaceController.consulter_interface);


module.exports = router;
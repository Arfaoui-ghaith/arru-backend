const express = require('express');
const router = express.Router();

const gouvernoratController = require('./../../controllers/iddp/gouvernorats');
const authController = require('./../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(gouvernoratController.consulter_tous_les_gouvernorats)

router.route('/:id')
    .get(gouvernoratController.consulter_gouvernorat)

module.exports = router;
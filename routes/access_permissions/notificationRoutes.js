const express = require('express');
const router = express.Router();

const notificationController = require('./../../controllers/access_permissions/notifications');
const authController = require('./../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(/*authController.restrictTo("consulter les traces"),*/ notificationController.consulter_tous_les_notifications);

module.exports = router;
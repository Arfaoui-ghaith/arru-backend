const express = require('express');
const router = express.Router();

const fonctionateController = require('./../../controllers/access_permissions/fonctionalites');
const authController = require('./../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(/*authController.restrictTo("consulter les fonctionalites"),*/fonctionateController.consulter_tous_les_fonctionalites)
    .post(fonctionateController.ajout_fonctionalite);

router.route('/:id')
    .get(authController.restrictTo("consulter les fonctionalites"),fonctionateController.consulter_fonctionalite);


module.exports = router;
const express = require('express');
const router = express.Router();

const fonctionateController = require('./../controllers/fonctionalites');
const authController = require('./../controllers/authController');

router.use(authController.protect);

router.route('/')
    .get(fonctionateController.consulter_tous_les_fonctionalites)
    .post(fonctionateController.ajout_fonctionalite);

router.route('/:id')
    .get(fonctionateController.consulter_fonctionalite);


module.exports = router;
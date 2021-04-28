const express = require('express');
const router = express.Router();

const pointController = require('./../../controllers/iddp/points');
const authController = require('../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(pointController.consulter_tous_les_points)
    .post(pointController.ajout_point);

router.route('/:id')
    .get(pointController.consulter_point)
    .put(pointController.modifier_point)
    .delete(pointController.supprimer_point);

module.exports = router;
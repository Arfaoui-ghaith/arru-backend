const express = require('express');
const router = express.Router();

const limiteController = require('./../../controllers/iddp/limites_qaurtiers');
const authController = require('./../controllers/authController');

router.use(authController.protect);

router.route('/')
    .get(limiteController.consulter_tous_les_limites)
    .post(limiteController.ajout_limite);

router.route('/:id')
    .get(limiteController.consulter_limite)
    .put(limiteController.modifier_limite)
    .delete(limiteController.supprimer_limite);


module.exports = router;
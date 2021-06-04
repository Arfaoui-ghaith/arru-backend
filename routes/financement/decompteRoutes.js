const express = require('express');
const router = express.Router();

const DecompteController = require('./../../controllers/financement/decomptes');
const authController = require('../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(DecompteController.consulter_tous_les_decomptes)
    .post(DecompteController.ajout_decompte);

router.route('/:id')
    .get(DecompteController.consulter_decompte)
    .put(DecompteController.modifier_decompte)
    .delete(DecompteController.supprimer_decompte);

module.exports = router;
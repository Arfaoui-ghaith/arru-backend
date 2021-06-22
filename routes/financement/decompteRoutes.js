const express = require('express');
const router = express.Router();

const DecompteController = require('./../../controllers/financement/decomptes');
const authController = require('../../controllers/access_permissions/authController');

router.use(authController.protect);

router.route('/')
    .get(authController.restrictTo('consulter les decomptes'), DecompteController.consulter_tous_les_decomptes)
    .post(authController.restrictTo('ajouter decompte'), DecompteController.ajout_decompte);

router.route('/:id')
    .get(DecompteController.consulter_decompte)
    .put(authController.restrictTo('modifier decompte'), DecompteController.modifier_decompte)
    .delete(authController.restrictTo('supprimer decompte'), DecompteController.supprimer_decompte);

module.exports = router;
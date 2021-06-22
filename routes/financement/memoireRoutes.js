const express = require('express');
const router = express.Router();

const MemoireController = require('./../../controllers/financement/memoires');
const authController = require('../../controllers/access_permissions/authController');

router.use(authController.protect);

router.route('/')
    .get(authController.restrictTo('consulter les memoires'), MemoireController.consulter_tous_les_memoires)
    .post(authController.restrictTo('ajouter memoire'), MemoireController.ajout_memoire);

router.route('/sans_decompte')
    .get(MemoireController.consulter_tous_les_memoires_sans_decompte);

router.route('/:id')
    .get(MemoireController.consulter_memoire)
    .put(authController.restrictTo('modifier memoire'), MemoireController.modifier_Memoire)
    .delete(authController.restrictTo('supprimer memoire'), MemoireController.supprimer_memoire);

module.exports = router;
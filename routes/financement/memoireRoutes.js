const express = require('express');
const router = express.Router();

const MemoireController = require('./../../controllers/financement/memoires');
const authController = require('../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(MemoireController.consulter_tous_les_memoires)
    .post(MemoireController.ajout_memoire);

router.route('/sans_decompte')
    .get(MemoireController.consulter_tous_les_memoires_sans_decompte);

router.route('/:id')
    .get(MemoireController.consulter_memoire)
    .put(MemoireController.modifier_Memoire)
    .delete(MemoireController.supprimer_memoire);

module.exports = router;
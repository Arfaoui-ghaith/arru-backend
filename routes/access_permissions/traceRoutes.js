const express = require('express');
const router = express.Router();

const traceController = require('./../../controllers/access_permissions/traces');
const authController = require('./../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(/*authController.restrictTo("consulter les traces"),*/ traceController.consulter_tous_les_traces);

router.route('/:id')
    .get(traceController.consulter_tous_les_traces_par_utilisateur);

module.exports = router;
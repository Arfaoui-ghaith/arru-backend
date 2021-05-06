const express = require('express');
const router = express.Router();

const critereController = require('./../../controllers/iddp/criteres');
const authController = require('./../../controllers/access_permissions/authController');

//router.use(authController.protect);

router.route('/')
    .get(critereController.consulter_tous_les_criteres)
    .post(critereController.ajout_critere);

router.route('/test_eligible')
    .get(critereController.test_eligible);

router.route('/eligible/:id')
    .put(critereController.eligible);

router.route('/ineligible/:id')
    .put(critereController.ineligible);

router.route('/:id')
    .get(critereController.consulter_critere)
    .put(critereController.modifier_critere);

router.route('/gouvernorat/:id')
    .get(critereController.consulter_critere_par_gouvernorat);




module.exports = router;
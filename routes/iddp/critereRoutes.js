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
    
module.exports = router;
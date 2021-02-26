const express = require('express');
const router = express.Router();

const specificationController = require('./../controllers/specfications');


router.route('/')
    .get(specificationController.consulter_tous_les_specifications)
    .post(specificationController.ajout_specification);

router.route('/:id')
    .get(specificationController.consulter_specification)
    .put(specificationController.modifier_specification)
    .delete(specificationController.supprimer_specification);


module.exports = router;
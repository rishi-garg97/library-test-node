const express = require('express');
const router = express.Router();

const entity_controller = require('../controllers/entity.controller');
router.post('/create', entity_controller.create());

module.exports = router;

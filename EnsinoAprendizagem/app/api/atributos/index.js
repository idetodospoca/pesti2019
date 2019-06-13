const router     = require('express').Router();
const controller = require('./atributos.controller');
const auth       = require('../middleware/auth.middleware');

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.create);

module.exports = router;

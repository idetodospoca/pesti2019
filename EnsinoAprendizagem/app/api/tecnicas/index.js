const router     = require('express').Router();
const controller = require('./tecnicas.controller');
const auth       = require('../middleware/auth.middleware');

router.get('/', auth.isAuthenticated(), auth.hasRole('psicologo'), controller.index);
router.post('/', auth.isAuthenticated(), auth.hasRole('psicologo'), controller.create);

module.exports = router;

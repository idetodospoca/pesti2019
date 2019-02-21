const router     = require('express').Router();
const controller = require('./atividades.controller');
const auth       = require('../middleware/auth.middleware');

router.get('/', controller.index);
router.post('/', auth.isAuthenticated(), auth.hasRole('professor'), controller.create);

module.exports = router;

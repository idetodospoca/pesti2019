const router     = require('express').Router();
const controller = require('./utilizadores.controller');
const auth       = require('../middleware/auth.middleware');

router.get('/', controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);


module.exports = router;

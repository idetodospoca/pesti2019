const router     = require('express').Router();
const controller = require('./utilizadores.controller');

router.get('/', controller.index);

module.exports = router;

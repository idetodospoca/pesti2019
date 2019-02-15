const router     = require('express').Router();
const controller = require('./utilizadores.controller');

router.get('/', controller.list);

module.exports = router;

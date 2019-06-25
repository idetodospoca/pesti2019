const router     = require('express').Router();
const controller = require('./projetos.controller');
const auth       = require('../middleware/auth.middleware');

router.get('/', controller.index);
router.get('/:id', auth.isAuthenticated(), auth.hasRole('professor'), controller.show);
router.post('/', auth.isAuthenticated(), auth.hasRole('professor'), controller.create);
router.post('/:id/invite/:email', auth.isAuthenticated(), auth.hasRole('professor'), controller.invite);
router.delete('/:id', auth.isAuthenticated(), auth.hasRole('professor'), controller.remove);
router.put('/:id', auth.isAuthenticated(), auth.hasRole('professor'), controller.edit);

module.exports = router;

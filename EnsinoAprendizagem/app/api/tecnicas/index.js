const router     = require('express').Router();
const controller = require('./tecnicas.controller');
const auth       = require('../middleware/auth.middleware');

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), auth.hasRole('psicologo_escolar'), controller.show);
router.post('/', auth.isAuthenticated(), auth.hasRole('psicologo_escolar'), controller.create);
router.delete('/:id', auth.isAuthenticated(), auth.hasRole('psicologo_escolar'), controller.remove);
router.put('/:id', auth.isAuthenticated(), auth.hasRole('psicologo_escolar'), controller.edit);

module.exports = router;

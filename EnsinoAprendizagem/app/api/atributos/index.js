const router     = require('express').Router();
const controller = require('./atributos.controller');
const auth       = require('../middleware/auth.middleware');


router.post('/deliverymode', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.createDM);
router.get('/deliverymode', auth.isAuthenticated(), controller.indexDM);
router.delete('/deliverymode/:id', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.removeDM);

router.post('/resolutionscope', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.createRS);
router.get('/resolutionscope', auth.isAuthenticated(), controller.indexRS);
router.delete('/resolutionscope/:id', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.removeRS);

router.post('/interaction', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.createINT);
router.get('/interaction', auth.isAuthenticated(), controller.indexINT);
router.delete('/interaction/:id', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.removeINT);

router.post('/behaviour', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.createBH);
router.get('/behaviour', auth.isAuthenticated(), controller.indexBH);
router.delete('/behaviour/:id', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.removeBH);

router.post('/affective', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.createAF);
router.get('/affective', auth.isAuthenticated(), controller.indexAF);
router.delete('/affective/:id', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.removeAF);

router.post('/social', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.createSO);
router.get('/social', auth.isAuthenticated(), controller.indexSO);
router.delete('/social/:id', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.removeSO);

router.post('/task', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.createTT);
router.get('/task', auth.isAuthenticated(), controller.indexTT);
router.delete('/task/:id', auth.isAuthenticated(), auth.hasRole('psicologo_educacional'), controller.removeTT);


module.exports = router;

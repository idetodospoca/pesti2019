const router     = require('express').Router();
const controller = require('./auth.controller');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/confirm/:email/:token', controller.confirm);
router.get('/resend/:email', controller.resend);

module.exports = router;

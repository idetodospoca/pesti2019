const router = require('express').Router();              // get an instance of the express Router
const auth   = require('./middleware/auth.middleware');
// ROUTES FOR OUR API
// =============================================================================
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hooray! Welcome to our api!' });
});

router.use('/auth', require('./auth'));
router.use('/utilizadores', auth.isAuthenticated(), auth.hasRole('admin'), require('./utilizadores'));
router.use('/atividades', require('./atividades'));
router.use('/tecnicas', auth.isAuthenticated(), auth.hasRole('psicologo'), require('./tecnicas'));

module.exports = router;

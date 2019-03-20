const router = require('express').Router();              // get an instance of the express Router
const auth   = require('./middleware/auth.middleware');
// ROUTES FOR OUR API
// =============================================================================
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hooray! Welcome to our api!' });
});

router.use('/auth', require('./auth'));
router.use('/users', auth.isAuthenticated(), auth.hasRole('admin'), require('./utilizadores'));
router.use('/projects', require('./projetos'));
router.use('/tecnicas', auth.isAuthenticated(), auth.hasRole('psicologo_escolar', 'psicologo_educacional'), require('./tecnicas'));

module.exports = router;

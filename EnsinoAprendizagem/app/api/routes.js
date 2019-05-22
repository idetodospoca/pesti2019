const router = require('express').Router();              // get an instance of the express Router
const auth   = require('./middleware/auth.middleware');
// ROUTES FOR OUR API
// =============================================================================
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hooray! Welcome to our api!' });
});

router.use('/auth', require('./auth'));
router.use('/users', auth.isAuthenticated(), require('./utilizadores'));
router.use('/projects', require('./projetos'));
router.use('/techniques', auth.isAuthenticated(), auth.hasRole('psicologo_escolar', 'psicologo_educacional'), require('./tecnicas'));
router.use('/attributes', auth.isAuthenticated(), require('./atributos'));

module.exports = router;

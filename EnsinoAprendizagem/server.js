// call the packages we need
const express = require('express');                   // call express
const app     = express();                            // define our app using express
const config  = require('./app/config/environment');
const http    = require('http').Server(app);
const websocket = require('./app/components/websocket');
var secure = require('ssl-express-www');

//Configure the app
require('./app/config')(app);

//Configure SSL
app.use(secure);

// Initialize the websocket component
websocket.init(http);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', require('./app/api/routes.js'));

// START THE SERVER
// =============================================================================
let server = http.listen(config.port, () => {
    console.log('Express server listening on %d, in %s mode', config.port, config.env);
});

module.exports = server; //For testing

//Install express server
const express = require('express');
const path = require('path');
const secure = require('ssl-express-www');

const app = express();

//Configure SSL
app.use(secure);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/UI'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/UI/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

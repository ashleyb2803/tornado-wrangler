const path = require('path'); // Built into Node
const express = require('express');
const logger = require('morgan');
const app = express();
const weatherAlertsRoutes = require('./routes/weatherAlerts');
const locationsRoutes = require('./routes/locations');
const noaaAlertsRouter = require('./routes/noaaAlerts');
const tornadoEventsRoutes = require('./routes/tornadoEvents');





// Process the secrets/config vars in .env
require('dotenv').config();

// Connect to the database
require('./db');

app.use(logger('dev'));
// Serve static assets from the frontend's built code folder (dist)
app.use(express.static(path.join(__dirname, '../frontend/dist')));
// Note that express.urlencoded middleware is not needed
// because forms are not submitted!
app.use(express.json());

// Middleware to check the request's headers for a JWT and
// verify that it's a valid.  If so, it will assign the
// user object in the JWT's payload to req.user
app.use(require('./middleware/checkToken'));

// API Routes
app.use('/api/auth', require('./routes/auth'));


// Weather Alerts and Locations API Routes
app.use('/api/weatherAlerts', weatherAlertsRoutes);

// Locations API Routes
app.use('/api/locations', locationsRoutes);

// Tornado Events API Routes
app.use('/api/tornadoEvents', tornadoEventsRoutes);




// noaaAlerts API Routes
app.use('/api/noaa-alerts', noaaAlertsRouter);


// Use a "catch-all" route to deliver the frontend's production index.html
app.get('/*splat', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});

const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const treeRouter = require('./routes/tree.router');
const stepRouter = require('./routes/step.router');
const sortRouter = require('./routes/sort.router');
const firstRating = require('./routes/firstRating.router')
const lastRating = require('./routes/lastRating.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/tree', treeRouter);
app.use('/api/step', stepRouter);
app.use('/api/sort', sortRouter);
app.use('/api/firstRating', firstRating);
app.use('/api/lastRating', lastRating);




// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

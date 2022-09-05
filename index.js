const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');

//routes
const customerRoutes = require('./routes/customer');
const issueRoutes = require('./routes/issue');
const userRoutes = require('./routes/user');

//strategy config for passport
require('./helpers/passportStrategy');

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions = { credentials: true, origin: 'http://localhost:3001' };
app.use(cors(corsOptions));

//Set up mongoose connection
const mongoDB = process.env.MONGO_DB_URL;
mongoose.connect(
    mongoDB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) console.log('MongoDB connection successful.');
    }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Welcome home');
});

app.use('/user', userRoutes);
app.use(
    '/customer',
    passport.authenticate('jwt', { session: false }),
    customerRoutes
);
app.use(
    '/issue',
    passport.authenticate('jwt', { session: false }),
    issueRoutes
);

app.listen('3000', () => console.log('App is listening on port 3000'));

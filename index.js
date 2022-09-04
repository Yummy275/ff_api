const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions = { credentials: true, origin: 'http://localhost:3001' };
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Welcome home');
});

app.listen('3000', () => console.log('App is listening on port 3000'));

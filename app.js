const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const APIRoutes = require('./routes/api')

const app = express();

const mongoDB = require('./models/mongo');

(async() => {
    console.log(`[INFO] MongoDB Connecting to database ...`)
    await mongoDB.connect()
})()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', APIRoutes);
app.use('*', (req, res) => {
    res.send('Not Found')
})

module.exports = app;

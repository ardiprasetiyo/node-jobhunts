const dotenv = require('dotenv')
dotenv.config()

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const helmet = require('helmet')

const APIRoutes = require('./routes/api')

const app = express();
const mongoDB = require('./models/Mongo');

(async () => {
    console.log(`[INFO] MongoDB Connecting to database ...`)
    await mongoDB.connect()
})()

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/vue-jobhunts/dist')));
app.use(helmet())
// SSL
app.use('/.well-known', express.static(path.join(__dirname, '.well-known')))
app.use('/api', APIRoutes);
app.use('*', express.static(path.join(__dirname, 'public/vue-jobhunts/dist')))
module.exports = app;

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const APIRoutes = require('./routes/api')

const app = express();
const mongoDB = require('./models/Mongo');

(async() => {
    console.log(`[INFO] MongoDB Connecting to database ...`)
    await mongoDB.connect()
})()

const hostname = "joobhunts.herokuapp.com"

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/vue-jobhunts/dist')));
// SSL
app.use('/.well-known', express.static(path.join(__dirname, '.well-known')))
app.use('*',function(req,res,next){
    if(req.headers['x-forwarded-proto']!='https')
      res.redirect(`https://${hostname}`+req.url)
    else
      next() /* Continue to other routes if we're not redirecting */
  })

app.use('/api', APIRoutes);

module.exports = app;

const express = require('express');
const logger = require('morgan')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://ghadarh:test123*@ds263660.mlab.com:63660/extra", { useNewUrlParser: true })


// body parser config
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// Routes
const extraterrestres = require('./routes/extraterrestres');

// middlewares
app.use(logger('dev'));

// Routes
app.use('/api', extraterrestres);

// catch 404 errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') ==='development' ? err : {};
  const status = err.status || 500;

  //respons to client
  res.status(status).json({
    error: {
      message : error.message
    }
  });
  //respons to ourselves
  console.error(err);
});

// start the server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`server is listening on port ${port}`));

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import createError from 'http-errors';

import productRoutes from './routes/products';
import orderRoutes from './routes/orders';

const app = express();

// mongoDB
mongoose
  .connect(`${process.env.MONGO_DB_URI}/mern-test`)
  .then(() => console.log('connection successful'))
  .catch(err => console.error(err));

mongoose.Promise = global.Promise;

// logging
app.use(morgan('dev'));

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS support
app.use(cors());

app.use(express.static(path.resolve(process.cwd(), 'public')));

const API_URI = '/api';

app.get(API_URI, (req, res) => {
  res.send('Express to the rescue!');
});

app.use(`${API_URI}/products`, productRoutes);
app.use(`${API_URI}/orders`, orderRoutes);

// handle not found
app.use((req, res, next) => {
  const error = createError(404, 'Not Found');
  next(error);
});

// handle all errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

import express from 'express';
import bodyParser from 'body-parser';
import { connect, connection } from 'mongoose';
import { mongoURI } from './config/key`s';

connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

connection.on('connected', () => {
  console.log('Connected to mongo');
});

connection.on('error', err => {
  console.error('Mongo connection error:', err);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO refactor from common js to imports
require('./routes/routes')(app);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

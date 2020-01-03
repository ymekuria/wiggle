import express from 'express';
import bodyParser from 'body-parser';
import { connect, connection } from 'mongoose';
import './models/User';
import { mongoURI } from './config/keys';
import authRouter from './routes/authRoutes';
import homeRouter from './routes/routes';

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

app.use(homeRouter);
app.use(authRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

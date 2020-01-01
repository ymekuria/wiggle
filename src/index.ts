import express from 'express';
import app from './app';
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

// const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

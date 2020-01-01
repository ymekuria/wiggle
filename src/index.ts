import express from 'express';
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

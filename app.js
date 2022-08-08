const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

const mongoose = require('mongoose');

const routerUser = require('./routes/users');

const routerCard = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62f140af584915f737c2b932',
  };

  next();
});

app.use('/', routerUser);
app.use('/', routerCard);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

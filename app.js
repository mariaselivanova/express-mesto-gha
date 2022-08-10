const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const routerUser = require('./routes/users');

const routerCard = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62f1818a789e8cb6d51d4dbe',
  };

  next();
});

app.use('/', routerUser);
app.use('/', routerCard);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Страница с таким url не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

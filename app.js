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
    _id: '662f15900ac298b2be1689a03',
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

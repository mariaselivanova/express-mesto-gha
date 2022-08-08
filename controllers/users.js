const User = require('../models/user');

// Вернуть всех пользоваетелей.
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// Вернуть пользователя по _id.
const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Создать пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// Обновить профиль.
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// Обновить аватар.
const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateAvatar,
  updateProfile,
};

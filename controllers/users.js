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
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Некорректный id пользователя',
        });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
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
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200);
      res.send({
        _id: user._id,
        avatar: user.avatar,
        name,
        about,
      });
    })
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' }));
};

// Обновить аватар.
const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send({
      _id: user._id,
      avatar,
      name: user.name,
      about: user.about,
    }))
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

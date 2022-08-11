const User = require('../models/user');
const errorStatus = require('../utils/errorStatus');

// Вернуть всех пользоваетелей.
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(errorStatus.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

// Вернуть пользователя по _id.
const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(errorStatus.NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Некорректные данные пользователя' });
      } else {
        res.status(errorStatus.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Создать пользователя.
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Некорректные данные пользователя' });
      } else {
        res.status(errorStatus.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Обновить профиль.
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((newUser) => {
      if (!newUser) {
        res.status(errorStatus.NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(200).send({ data: newUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Некорректные данные пользователя' });
      } else {
        res.status(errorStatus.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Обновить аватар.
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((newUser) => res.status(200).send({ data: newUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Некорректные данные пользователя' });
      } else {
        res.status(errorStatus.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateAvatar,
  updateProfile,
};

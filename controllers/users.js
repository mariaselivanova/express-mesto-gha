const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFound = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const EmailExists = require('../errors/email-exists-err');
const AuthError = require('../errors/auth-err');

// Логин.
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => next(new AuthError('Неверные почта или пароль')));
};

// Вернуть всех пользоваетелей.
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

// Вернуть пользователя по _id.
const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Некорректный id пользователя'));
      }
      return next(err);
    });
};

// Создать пользователя.
const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при создании пользователя'));
      }
      if (err.code === 11000) {
        return next(new EmailExists(`Пользователь с таким email ${req.body.email} уже существует`));
      }
      return next(err);
    });
};

// Обновить профиль.
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((newUser) => {
      if (!newUser) {
        return next(new NotFound('Пользователь не найден'));
      }
      return res.send({ data: newUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при обновлении профиля'));
      }
      return next(err);
    });
};

// Обновить аватар.
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((newUser) => res.status(200).send({ data: newUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при обновлении аватара'));
      }
      return next(err);
    });
};

// Получение информации о пользователе.
const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => next(err));
};

module.exports = {
  login,
  getUsers,
  createUser,
  getUserInfo,
  getUser,
  updateAvatar,
  updateProfile,
};

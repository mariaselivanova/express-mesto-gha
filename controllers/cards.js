const Card = require('../models/card');
const errorStatus = require('../utils/errorStatus');

// Получить все карточки.
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(errorStatus.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

// Создать карточку.
const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(errorStatus.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Удалить карточку.
const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(errorStatus.NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Поставить лайк.
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(errorStatus.NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(errorStatus.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Убрать лайк с карточки.
const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(errorStatus.NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(errorStatus.BAD_REQUEST).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLike,
};

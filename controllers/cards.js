const Card = require('../models/card');

// Получить все карточки.
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка.' }));
};

// Создать карточку.
const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Удалить карточку.
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Карточка с указанным _id не найдена.' }));
};

// Поставить лайк карточке.
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: 'Переданы некорректные данные для добавления лайка',
        });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Некорректный id карточки',
        });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

// Убрать лайк с карточки.
const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: 'Карточка для удаления лайка не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Некорректный id карточки',
        });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLike,
};

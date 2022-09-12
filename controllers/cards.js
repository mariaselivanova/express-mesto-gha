const Card = require('../models/card');
const NotFound = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

// Получить все карточки.
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// Создать карточку.
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Неверный запрос'));
        return;
      }
      next(err);
    });
};

// Удалить карточку.
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      if (req.user._id.toString() !== card.owner.toString()) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }

      return Card.findByIdAndDelete(req.params.cardId)
        .then(() => {
          res.status(200).send({ message: 'Карточка успешно удалена' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Неверный запрос'));
        return;
      }
      next(err);
    });
};

// Поставить лайк.
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Неверный запрос'));
        return;
      }
      next(err);
    });
};

// Убрать лайк с карточки.
const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Неверный запрос'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLike,
};

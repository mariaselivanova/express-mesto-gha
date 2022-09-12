const routerCard = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLike,
} = require('../controllers/cards');

const {
  cardValidation,
  cardIdValidation,
} = require('../middlewares/validation');

routerCard.get('/', getCards);
routerCard.post('/', cardValidation, createCard);
routerCard.delete('/:cardId', cardIdValidation, deleteCard);
routerCard.put('/:cardId/likes', cardIdValidation, likeCard);
routerCard.delete('/:cardId/likes', cardIdValidation, deleteLike);

module.exports = routerCard;

const routerCard = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLike,
} = require('../controllers/cards');

routerCard.get('/', getCards);
routerCard.post('/', createCard);
routerCard.delete('/:cardId', deleteCard);
routerCard.put('/:cardId/likes', likeCard);
routerCard.delete('/:cardId/likes', deleteLike);

module.exports = routerCard;

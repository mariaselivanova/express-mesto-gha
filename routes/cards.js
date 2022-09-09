const routerCard = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLike,
} = require('../controllers/cards');

const {
  validationCard,
  validateCardId,
} = require('../middlewares/validation');

routerCard.get('/', getCards);
routerCard.post('/', validationCard, createCard);
routerCard.delete('/:cardId', validateCardId, deleteCard);
routerCard.put('/:cardId/likes', validateCardId, likeCard);
routerCard.delete('/:cardId/likes', validateCardId, deleteLike);

module.exports = routerCard;

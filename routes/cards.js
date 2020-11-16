const cardRouter = require('express').Router();

const {
  getCards, createCard, delCard, likeCard, disLikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:_id', delCard);
cardRouter.put('/:_id/likes', likeCard);
cardRouter.delete('/:_id/likes', disLikeCard);

module.exports = cardRouter;

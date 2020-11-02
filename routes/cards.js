const cardRouter = require('express').Router();

const { getCards } = require('../utils/read-file');

cardRouter.get('/', getCards);

module.exports = cardRouter;

const cardRouter = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const getCards = (req, res) => {
fsPromises.readFile(path.join(__dirname, '..', 'data', 'cards.json'))
    .then((data) => {
      res.status(200).send(JSON.parse(data))
    })
    .catch(err => {
      res.status(500).send({message: `Ошибка: ${err}`})
    });
  }

cardRouter.get('/', getCards);

module.exports = cardRouter;
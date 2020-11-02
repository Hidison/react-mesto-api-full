const userRouter = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const getUsersData = (req, res) => {
  fsPromises.readFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((data) => {
      res.status(200).send(JSON.parse(data))
    })
    .catch(err => {
      res.status(500).send({ message: `Ошибка: ${err}` })
    });
}

const getUsersId = (req, res) => {
  fsPromises.readFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((data) => {
      if (JSON.parse(data).find((user) => user._id === req.params.id)) {
        res.status(200).send(JSON.parse(data).find((user) => user._id === req.params.id))
      }
      res.status(404).send({ message: "Нет пользователя с таким id" })
    })
    .catch(err => {
      res.status(500).send({ message: `Ошибка: ${err}` })
    });
}

userRouter.get('/', getUsersData);
userRouter.get('/:id', getUsersId);

module.exports = userRouter;
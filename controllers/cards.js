const Card = require('../models/card');

const OkCode = 200;
const BadRequestCode = 400;
const NotFoundCode = 404;
const InternalServerErrorCode = 500;

const getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((data) => {
      res.status(OkCode).send(data);
    })
    .catch(() => {
      res.status(InternalServerErrorCode).send({ message: 'Ошибка: проблема на сервере' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })

    .then((data) => {
      res.status(OkCode).send({ data });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(BadRequestCode).send({ message: 'Ошибка: некорректные данные' });
      return res.status(InternalServerErrorCode).send({ message: 'Ошибка: проблема на сервере' });
    });
};

const delCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(new Error('NotFound'))
    .then((data) => {
      res.status(OkCode).send({ data });
    })
    .catch((err) => {
      if (err.message === 'NotFound') return res.status(NotFoundCode).send({ message: 'Ошибка: Карточка не найдена' });
      if (err.name === 'ValidationError') return res.status(BadRequestCode).send({ message: 'Ошибка: некорректные данные' });
      return res.status(InternalServerErrorCode).send({ message: 'Ошибка: проблема на сервере' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((data) => {
      res.status(OkCode).send({ data });
    })
    .catch((err) => {
      if (err.message === 'NotFound') return res.status(NotFoundCode).send({ message: 'Ошибка: Карточка не найдена' });
      return res.status(InternalServerErrorCode).send({ message: 'Ошибка: проблема на сервере' });
    });
};

const disLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((data) => {
      res.status(OkCode).send({ data });
    })
    .catch((err) => {
      if (err.message === 'NotFound') return res.status(NotFoundCode).send({ message: 'Ошибка: Карточка не найдена' });
      return res.status(InternalServerErrorCode).send({ message: 'Ошибка: проблема на сервере' });
    });
};

module.exports = {
  getCards,
  createCard,
  delCard,
  likeCard,
  disLikeCard,
};

const User = require('../models/user');

const OkCode = 200;
const BadRequestCode = 400;
const NotFoundCode = 404;
const InternalServerErrorCode = 500;

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.status(OkCode).send(data);
    })
    .catch(() => {
      res.status(InternalServerErrorCode).send({ message: 'Ошибка: проблема на сервере' });
    });
};

const getUserId = (req, res) => {
  User.findById(req.params._id)
    .orFail(new Error('NotFound'))
    .then((data) => {
      res.status(OkCode).send(data);
    })
    .catch((err) => {
      if (err.message === 'NotFound') return res.status(NotFoundCode).send({ message: 'Ошибка: Пользователь не найден' });
      return res.status(InternalServerErrorCode).send({ message: 'Ошибка: проблема на сервере' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })

    .then((data) => {
      res.status(OkCode).send({ data });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(BadRequestCode).send({ message: 'Ошибка: некорректные данные' });
      return res.status(InternalServerErrorCode).send({ message: 'Ошибка: проблема на сервере' });
    });
};

const updateUserPrifile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((data) => {
      res.status(OkCode).send({ data });
    })
    .catch((err) => {
      if (err.message === 'NotFound') return res.status(NotFoundCode).send({ message: 'Ошибка: Пользователь не найден' });
      if (err.name === 'ValidationError') return res.status(BadRequestCode).send({ message: 'Ошибка: некорректные данные' });
      return res.status(InternalServerErrorCode).send({ message: 'Ошибка: проблема на сервере' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((data) => {
      res.status(OkCode).send({ data });
    })
    .catch((err) => {
      if (err.message === 'NotFound') return res.status(NotFoundCode).send({ message: 'Ошибка: Пользователь не найден' });
      if (err.name === 'ValidationError') return res.status(BadRequestCode).send({ message: 'Ошибка: некорректные данные' });
      return res.status(InternalServerErrorCode).send({ message: 'Ошибка: проблема на сервере' });
    });
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUserPrifile,
  updateUserAvatar,
};

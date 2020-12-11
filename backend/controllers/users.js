const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictingRequestError = require('../errors/conflicting-request-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((data) => {
      res.send({ data });
    })
    .catch(next);
};

const getUserId = (req, res, next) => {
  User.findById(req.params._id)
    .orFail(new NotFoundError('Пользователь не найдена'))
    .then((data) => {
      res.send({ data });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найдена'))
    .then((data) => {
      res.send({ data });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') throw new BadRequestError('некорректные данные');
    })
    .catch(next);
};

const updateUserPrifile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь не найдена'))
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('некорректные данные');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictingRequestError('Пользователь с таким email уже зарегестрирован');
      }
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь не найдена'))
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') throw new BadRequestError('некорректные данные');
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
      );

      res.send({ token });
    })

    .catch(() => next(new UnauthorizedError('Неправильные почта или пароль')));
};

module.exports = {
  getUsers,
  getUserId,
  getUserInfo,
  createUser,
  updateUserPrifile,
  updateUserAvatar,
  login,
};

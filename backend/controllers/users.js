const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  user.find({})
    .then((data) => {
      res.send({ data: data });
    })
    .catch(next);
};

const getUserId = (req, res, next) => {
  user.findById(req.params._id)
    .orFail(new NotFoundError("Пользователь не найдена"))
    .then((data) => {
      res.send({ data: data });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  user.findById(req.user._id)
    .orFail(new NotFoundError("Пользователь не найдена"))
    .then((data) => {
      res.send({ data: data });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  user.create({ name, about, avatar, email, password });

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      user.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((data) => {
      res.send({ data: data });
    })
    .catch((err) => {
      if (err.name === "ValidationError")
        throw new BadRequestError("некорректные данные");
    })
    .catch(next);
};

const updateUserPrifile = (req, res, next) => {
  const { name, about } = req.body;

  user.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("Пользователь не найдена"))
    .then((data) => {
      res.send({ data: data });
    })
    .catch((err) => {
      if (err.name === "ValidationError")
        throw new BadRequestError("некорректные данные");
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  user.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("Пользователь не найдена"))
    .then((data) => {
      res.status(OkCode).send({ data: data });
    })
    .catch((err) => {
      if (err.name === "ValidationError")
        throw new BadRequestError("некорректные данные");
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return user.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {expiresIn: "7d",}
      );

      res.send({ token });
    })
    .catch(next(new UnauthorizedError('Неправильные почта или пароль')));
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

const Card = require("../models/card");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err");

const getCards = (req, res, next) => {
  Card.find({})
    .populate("user")
    .then((data) => {
      res.send({ data: data });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((data) => {
      res.send({ data: data });
    })
    .catch((err) => {
      if (err.name === "ValidationError")
        throw new BadRequestError("некорректные данные");
    })
    .catch(next);
};

const delCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(new NotFoundError("Карточка не найдена"))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params._id)
          .then((data) => {
            res.send({ data: data });
          })
          .catch((err) => {
            if (err.name === "ValidationError")
              throw new BadRequestError("некорректные данные");
          })
          .catch(next);
      } else {
        throw new ForbiddenError("У вас нет прав для удаления карточки");
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("Карточка не найдена"))
    .then((data) => {
      res.send({ data: data });
    })
    .catch(next);
};

const disLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("Карточка не найдена"))
    .then((data) => {
      res.send({ data: data });
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  delCard,
  likeCard,
  disLikeCard,
};

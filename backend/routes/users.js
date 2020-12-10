const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require("validator");

  const validateUrl = (v) => {
    return validator.isEmail(v);
  };


const {
  getUsers, getUserId, getUserInfo, updateUserPrifile, updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
}), getUserId);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserPrifile);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateUrl).required(),
  }),
}), updateUserAvatar);

module.exports = userRouter;

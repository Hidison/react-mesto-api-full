const userRouter = require('express').Router();

const {
  getUsers, getUserId, createUser, updateUserPrifile, updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:_id', getUserId);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUserPrifile);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;

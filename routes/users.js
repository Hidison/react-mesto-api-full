const userRouter = require('express').Router();

const { getUsersData, getUsersId } = require('../utils/read-file');

userRouter.get('/', getUsersData);
userRouter.get('/:id', getUsersId);

module.exports = userRouter;

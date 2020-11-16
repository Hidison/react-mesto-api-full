const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '5fb1c675582ee700d49aa502',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {

});

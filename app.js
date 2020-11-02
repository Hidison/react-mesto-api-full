const express = require('express');

const cardRouter = require('./routes/cards.js');
const userRouter = require('./routes/users.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(__dirname + '/public'));
app.use('/cards', cardRouter);
app.use('/users', userRouter);
app.use((req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
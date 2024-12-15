const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const { todoRouter } = require('./routes/todo.js')
const cors = require('cors')

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors())

app.use('/api/todo', todoRouter)

const main = async () => {
    await mongoose.connect(MONGO_URI);

    app.listen(PORT, () => {
        console.log(`Server listening to port ${PORT}`)
    });
}

main();
module.exports = { app };
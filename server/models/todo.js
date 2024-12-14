const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    },
})

const TodoModel = mongoose.model('todos', todoSchema)
module.exports = {
    TodoModel
}
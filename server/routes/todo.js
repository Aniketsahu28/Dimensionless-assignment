const { Router } = require('express');
const todoRouter = Router();
const { TodoModel } = require('../models/todo')

todoRouter.post('/createtodo', async (req, res) => {
    const { title, date, time } = req.body;
    try {
        await TodoModel.create({
            title,
            date,
            time
        })

        res.status(201).json({
            message: "New todo added"
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

todoRouter.get('/', async (req, res) => {
    try {
        const todos = await TodoModel.find({})
        if (todos.length > 0) {
            res.status(200).json({
                todos
            })
        }
        else {
            res.status(404).json({
                message: "No todo found"
            })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

todoRouter.patch('/', async (req, res) => {
    const { id, title, date, time, status } = req.body
    try {
        const response = await TodoModel.updateOne({ "_id": id }, {
            title,
            date,
            time,
            status
        })
        res.status(200).json({
            message: "Todo updated",
            response
        })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

todoRouter.delete('/deleteone', async (req, res) => {
    const { id } = req.body;
    try {
        await TodoModel.deleteOne({ "_id": id })
        res.status(200).json({
            message: "Todo deleted"
        })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

todoRouter.delete('/deleteall', async (req, res) => {
    try {
        await TodoModel.deleteMany({})
        res.status(200).json({
            message: "All todos deleted"
        })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = {
    todoRouter
}
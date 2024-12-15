const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../index');
const { TodoModel } = require('../models/todo');

beforeAll(async () => {
    await mongoose.connect("", { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
    await TodoModel.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Todo API Tests', () => {
    describe('POST /api/todo/createtodo', () => {
        it('should create a new todo with only title and return status 201', async () => {
            const newTodo = { title: 'Test Todo' };
            const res = await request(app).post('/api/todo/createtodo').send(newTodo);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('message', 'New todo added');

            const todos = await TodoModel.find({});
            expect(todos.length).toBe(1);
            expect(todos[0].title).toBe('Test Todo');
            expect(todos[0].date).toBeUndefined();
            expect(todos[0].time).toBeUndefined();
        });

        it('should return 400 if no title is provided', async () => {
            const res = await request(app).post('/api/todo/createtodo').send({});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('message', 'Title is required');
        });
    });

    describe('GET /api/todo/', () => {
        it('should return all todos with status 200', async () => {
            await TodoModel.create({ title: 'Sample Todo' });
            const res = await request(app).get('/api/todo/');
            expect(res.statusCode).toBe(200);
            expect(res.body.todos).toHaveLength(1);
            expect(res.body.todos[0]).toHaveProperty('title', 'Sample Todo');
        });

        it('should return 404 if no todos exist', async () => {
            const res = await request(app).get('/api/todo/');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message', 'No todo found');
        });
    });

    describe('PATCH /api/todo/', () => {
        it('should update an existing todo and return status 200', async () => {
            const todo = await TodoModel.create({ title: 'Old Todo' });
            const updatedTodo = { id: todo._id, title: 'Updated Todo', date: '2024-12-31', time: '11:00 AM' };
            const res = await request(app).patch('/api/todo/').send(updatedTodo);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Todo updated');

            const updated = await TodoModel.findById(todo._id);
            expect(updated.title).toBe('Updated Todo');
            expect(updated.date).toBe('2024-12-31');
            expect(updated.time).toBe('11:00 AM');
        });

        it('should return 500 if the todo ID is invalid', async () => {
            const res = await request(app).patch('/api/todo/').send({ id: 'invalidId' });
            expect(res.statusCode).toBe(500);
            expect(res.body).toHaveProperty('message', 'Internal server error');
        });
    });

    describe('DELETE /api/todo/deleteone', () => {
        it('should delete a specific todo and return status 200', async () => {
            const todo = await TodoModel.create({ title: 'Todo to delete' });
            const res = await request(app).delete('/api/todo/deleteone').send({ id: todo._id });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Todo deleted');

            const todos = await TodoModel.find({});
            expect(todos.length).toBe(0);
        });

        it('should return 500 if the todo ID is invalid', async () => {
            const res = await request(app).delete('/api/todo/deleteone').send({ id: 'invalidId' });
            expect(res.statusCode).toBe(500);
            expect(res.body).toHaveProperty('message', 'Internal server error');
        });
    });

    describe('DELETE /api/todo/deleteall', () => {
        it('should delete all todos and return status 200', async () => {
            await TodoModel.create({ title: 'Todo 1' });
            await TodoModel.create({ title: 'Todo 2' });
            const res = await request(app).delete('/api/todo/deleteall');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'All todos deleted');

            const todos = await TodoModel.find({});
            expect(todos.length).toBe(0);
        });
    });
});

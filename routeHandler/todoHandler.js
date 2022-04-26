const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../Schemas/todoSchema');

const Todo = new mongoose.model("Todo", todoSchema)

// GET ALL THE TODOS 
router.get('/', (req, res) => {
    Todo.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error",
                message: err.message
            })
        } else {
            res.status(200).json({
                message: "Todos retrieved successfully",
                result: data
            })
        }
    })
})

// GET ACTIVE  TODOS 
router.get('/active', async (req, res) => {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
        data,
    })
})

// GET A TODO BY ID
router.get('/:id', (req, res) => {
    Todo.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error",
                message: err.message
            })
        } else {
            res.status(200).json({
                message: "Todo retrieved successfully",
                result: data
            })
        }
    })
})

// CREATE A TODO
router.post('/create', (req, res) => {
    const newTodo = new Todo(req.body);
    newTodo.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error",
                message: err.message
            })
        } else {
            res.status(200).json({
                message: "Todo was inserted successfully"
            })
        }
    })
})

// CREATE MULTI TODOS
router.post('/create-multi', (req, res) => {
    Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error",
                message: err.message
            })
        } else {
            res.status(200).json({
                message: 'All todos inserted successfully'
            })
        }
    })
})

// UPDATE A TODO
router.put('/update/:id', (req, res) => {
    console.log('todo id', req.params.id)
    Todo.updateOne({ _id: req.params.id }, {
        $set: {
            status: 'active'
        }
    }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error",
                message: err.message
            })
        } else {
            res.status(200).json({
                message: 'Todo updated successfully'
            })
        }
    })
})

// DELETE   A TODO
router.delete('/delete/:id', (req, res) => {
    Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error",
                message: err.message
            })
        } else {
            res.status(200).json({
                message: 'Todo deleted successfully'
            })
        }
    })
})
// export module 
module.exports = router
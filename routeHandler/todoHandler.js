const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../Schemas/todoSchema');

const Todo = new mongoose.model("Todo", todoSchema)

// GET ALL THE TODOS 
router.get('/', async (req, res) => {
    await Todo.find({ status: 'active' }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error",
                message: err.message
            })
        } else {
            res.status(200).json({
                message: "Todo was inserted successfully",
                result: data
            })
        }
    })
})

// GET A TODO BY ID
router.get('/:id', (req, res) => {

})

// CREATE A TODO
router.post('/create', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
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
router.post('/create-multi', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
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
router.put('/update/:id', async (req, res) => {
    console.log('todo id', req.params.id)
    await Todo.updateOne({ _id: req.params.id }, {
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
router.delete('/delete/:id', async (req, res) => {
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
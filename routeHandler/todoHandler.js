const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../Schemas/todoSchema');

const Todo = new mongoose.model("Todo", todoSchema)

// GET ALL THE TODOS 
router.get('/', (req, res) => {

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
router.post('/create-multi', (req, res) => {

})

// UPDATE A TODO
router.put('/update/:id', (req, res) => {

})

// DELETE   A TODO
router.delete('/delete/:id', (req, res) => {

})
// export module 
module.exports = router
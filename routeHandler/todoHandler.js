const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkLogin = require('../middlewares/checkLogin');
const todoSchema = require('../Schemas/todoSchema');
const User = require('../Models/UserModel');
const Todo = require('../Models/TodoModel');


// GET ALL THE TODOS 
router.get('/', checkLogin, (req, res) => {
    Todo.find({})
        .populate("user", "name username -_id")
        .exec((err, data) => {
            if (!err) {
                res.status(200).json({
                    "message": "Todos retrievrd successfully",
                    "result": data
                })
            } else {
                res.status(500).json({
                    "error": err.message
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

// GET ACTIVE  TODOS 
router.get('/active-callback', (req, res) => {
    const todo = new Todo();
    const data = todo.findActiveCallback((err, data) => {
        if (!err) {
            res.status(200).json({
                message: 'Get active todos with callback',
                data,
            })
        } else {
            res.status(500).json({
                message: 'There was a server side error',
                error: err
            })
        }
    });

})

// GET JS  TODOS 
router.get('/js', async (req, res) => {
    try {
        const data = await Todo.findByJS();
        res.status(200).json({
            message: 'JS data retrieve successfully',
            data,
        })
    } catch (error) {
        res.status(500).json({
            message: 'There was a server side error',
            'error': error.message
        })
    }
})

// GET J TODOS BY LANGUAGE
router.get("/language", async (req, res) => {

    try {
        const data = await Todo.find().byLanguage("react");
        res.status(200).json({
            message: 'Todos by language get successfully',
            data,
        });
    } catch (err) {
        res.status(500).json({
            message: 'There was a server side error'
        })
    }
});

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
router.post('/create', checkLogin, async (req, res) => {
    const newTodo = new Todo({
        ...req.body,
        user: req.userId
    });
    try {
        const todo = await newTodo.save();
        await User.updateOne({
            _id: req.userId
        }, {
            $push: {
                todos: todo._id
            }
        })
        res.status(200).json({
            "message": "Todo inserted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
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
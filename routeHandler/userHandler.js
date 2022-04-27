const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userSchema = require('../Schemas/userSchema');
const User = require('../Models/UserModel')

// User signup
router.post('/signup', async (req, res) => {
    try {
        const hasedPasswrod = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hasedPasswrod,
            status: 'active'
        });
        const userResponseObj = {
            name: req.body.name,
            username: req.body.username,
            status: 'active'
        }
        await newUser.save();
        res.status(200).json({
            message: "User created successfully",
            user: userResponseObj
        })
    } catch (error) {
        res.status(500).json({
            message: "There was a server side error",
            error: error.message
        })
    }
})
// User login
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isPasswordValid = await bcrypt.compare(req.body.password, user[0].password);

            if (isPasswordValid) {
                // generate token 
                const token = jwt.sign({
                    username: user[0].username,
                    userid: user[0]._id
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });

                res.status(200).json({
                    "access_token": token,
                    "message": "Login successful"
                })

            } else {
                res.status(401).json({
                    "error": "Authentication failed,invalid password"
                })
            }
        } else {
            res.status(401).json({
                "error": "Authentication failed, User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "There was a server side error",
            error: error.message
        })
    }
})

// Get all user 
router.get('/all', async (req, res) => {
    try {
        const users = await User.find({
            status: 'active'
        })
            .select({
                password: 0,
                __v: 0,
                _id: 0
            })
            .populate("todos");

        res.status(200).json({
            data: users,
            message: "Success"
        });
    } catch (error) {
        res.status(500).json({
            "message": "There was a server side error",
            "error": error.message
        })
    }
})

module.exports = router;
const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})


// register page
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  res.render('register')
})

module.exports = router
const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { autenticated } = require('../config/auth')
// home page
router.get('/', autenticated, (req, res) => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  Record.find((err, records) => {
    if (err) return console.log(err);
    res.render('index', { records, months })
  })
})



module.exports = router
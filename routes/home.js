const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { autenticated } = require('../config/auth')
const anychart = require('anychart')
// home page
router.get('/', autenticated, (req, res) => {
  // create filter array
  const months_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const category_array = ['食', '衣', '住', '行', '其他', '所有']

  //create variable to display totalAmout in view
  let totalAmount = 0

  // if months isn't seleted,set default value to current month
  req.query.months = req.query.months || new Date().getMonth() + 1
  // if category isn't seleted,set default value to all categories
  req.query.category = req.query.category || ''

  // create variables 
  let months = req.query.months
  let category = req.query.category

  // create font-awesome image object
  const category_image = {
    '食': '<i class="fas fa-utensils"></i>',
    '衣': '<i class="fas fa-tshirt"></i>',
    '住': '<i class="fas fa-home"></i>',
    '行': '<i class="fas fa-bus"></i>',
    '其他': '<i class="fas fa-shopping-bag"></i>'
  }

  // setting filter pattern
  let filter = {
    userId: req.user._id
  }
  if (req.query.category === '' || req.query.category === '所有') {
    filter.date = { "$gte": new Date(2019, req.query.months - 1, 1), "$lt": new Date(2019, req.query.months, 0) }
  } else {
    filter.date = { "$gte": new Date(2019, req.query.months - 1, 1), "$lt": new Date(2019, req.query.months, 0) }
    filter.category = category
  }

  // gaining data from db
  Record.find(filter, (err, records) => {
    if (err) return console.log(err);
    records.forEach(item => {
      totalAmount += Number(item.amount)
    })
    res.render('index', { records, months_array, category_array, totalAmount, months, category, category_image })
  })
})

module.exports = router
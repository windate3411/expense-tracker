const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { autenticated } = require('../config/auth')
// home page
router.get('/', autenticated, (req, res) => {
  const months_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const category_array = ['食', '衣', '住', '行', '其他']
  let totalAmount = 0
  req.query.months = req.query.months || 1
  let months = req.query.months
  let category = req.query.category
  const category_image = {
    '食': '<i class="fas fa-utensils"></i>',
    '衣': '<i class="fas fa-tshirt"></i>',
    '住': '<i class="fas fa-home"></i>',
    '行': '<i class="fas fa-bus"></i>',
    '其他': '<i class="fas fa-shopping-bag"></i>'
  }
  Record.find({
    userId: req.user._id,
    date: { "$gte": `2019-${req.query.months}`, "$lt": `2019-${Number(req.query.months) + 1}` },
    category: category
  }, (err, records) => {
    if (err) return console.log(err);
    records.forEach(item => {
      totalAmount += Number(item.amount)
    })
    res.render('index', { records, months_array, category_array, totalAmount, months, category, category_image })
  })
})



module.exports = router
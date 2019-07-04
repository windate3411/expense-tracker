const express = require('express')
const router = express.Router()

// importing models
const Record = require('../models/record')

// importing express-validator
const { check, validationResult } = require('express-validator');

// add new record
router.get('/new', (req, res) => {
  //create a function to get the current time to put in view
  const date = new Date()
  const currentDate = {
    year: date.getFullYear(),
    month: adjustTime(date.getMonth() + 1),
    date: adjustTime(date.getDate())
  }

  function adjustTime(time) {
    if (time.toString().length === 1) {
      return `0${time}`
    }
  }
  const result = `${currentDate.year}-${currentDate.month}-${currentDate.date}`
  res.render('new', { result })
})

router.post('/new', [
  check('name')
    .not().isEmpty()
    .withMessage('支出項目是必填項目喔!'),
  check('amount')
    .isInt()
    .not().isEmpty()
    .withMessage('金額是必填的整數喔!'),
  check('category')
    .not().isEmpty()
    .withMessage('類別是必選項目喔!'),
  check('date')
    .not().isEmpty()
    .withMessage('日期是必選項目喔!')
    .isISO8601()
    .withMessage('請填入標準的日期格式')
], (req, res) => {
  // redirect if input is invalid
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.render('new', { errors: errors.array() })
  }
  const newRecord = new Record()
  Object.assign(newRecord, req.body)
  newRecord.save(err => {
    if (err) return console.log(err);
    res.redirect('/')
  })
})

//edit page
router.get('/edit/:id', (req, res) => {
  Record.findOne({ _id: req.params.id }, (err, record) => {
    if (err) return console.log(err);
    // slice record.date so then it could be used in edit.handlebars as value = {{record_date}}
    const record_date = JSON.stringify(record.date).slice(1, 11)
    res.render('edit', { record, record_date })
  })
})

router.put('/edit/:id', [
  check('name')
    .not().isEmpty()
    .withMessage('支出項目是必填項目喔!'),
  check('amount')
    .isInt()
    .not().isEmpty()
    .withMessage('金額是必填的整數喔!'),
  check('category')
    .not().isEmpty()
    .withMessage('類別是必選項目喔!'),
  check('date')
    .not().isEmpty()
    .withMessage('日期是必選項目喔!')
    .isISO8601()
    .withMessage('請填入標準的日期格式')
], (req, res) => {
  Record.findOne({ _id: req.params.id }, (err, record) => {
    if (err) return console.log(err);
    // assign form input data to record
    Object.assign(record, req.body)
    record.save(err => {
      if (err) return console.log(err);
      res.redirect('/')
    })
  })
})

// remove record
router.delete('/delete/:id', (req, res) => {
  Record.findOne({ _id: req.params.id }, (err, record) => {
    if (err) return console.log(err);
    record.remove(err => {
      if (err) return console.log(err);
      res.redirect('/')
    })
  })
})

module.exports = router
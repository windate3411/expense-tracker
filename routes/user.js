const express = require('express')
const router = express.Router()

// importing models for new docs in DB
const Record = require('../models/record')
const User = require('../models/user')

// importing bcrypt for password hash
const bcrypt = require('bcryptjs')

// importing express-validator for back-end validation
const { check, validationResult } = require('express-validator')
// login page
router.get('/login', (req, res) => {
  res.render('login')
})


// register page
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', [
  check('name')
    .not().isEmpty()
    .withMessage('使用者名稱是必填項目喔!'),
  check('email')
    .not().isEmpty()
    .withMessage('使用者信箱是必填項目喔!')
    .isEmail()
    .withMessage('請輸入正確的Email格式'),
  check('password')
    .not().isEmpty()
    .withMessage('使用者密碼是必填項目喔!')
    .isLength({ min: 8 })
    .withMessage("使用者密碼必須至少8個字元!")
], (req, res) => {
  // if validation fails,redirect
  const err_msg = validationResult(req)
  if (!err_msg.isEmpty()) {
    return res.render('register', { err_msg: err_msg.array() })
  }
  const { name, email, password, password2 } = req.body
  let errors = []
  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填!' })
  }
  if (password !== password2) {
    errors.push({ message: '兩次密碼輸入不一致!' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ message: '此信箱已被註冊過!' })
        console.log('User already exsist!');
        res.render('register', { errors, name, email, password, password2 })
      } else {
        //else add new user to DB
        const newUser = new User({
          name,
          email,
          password
        })
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.log(err);
            newUser.password = hash
            newUser
              .save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => {
                console.log(err);
              })
          }))
      }
    })
  }

})

module.exports = router
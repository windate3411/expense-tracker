// importing models
const Record = require('../record')
const User = require('../user')
const mongoose = require('mongoose')

// importing datas
const user_data = require('./user.json').results
const record_data = require('./record.json').results

// importing bcrypts
const bcrypts = require('bcryptjs')

// setting db connect
mongoose.connect('mongodb://127.0.0.1/record', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('error');
})

db.once('open', () => {
  //create users
  user_data.forEach((item, index) => {
    bcrypts.genSalt(10, (err, salt) => {
      bcrypts.hash(item.password, salt, (err, hash) => {
        const newUser = new User({
          name: item.name,
          password: hash,
          email: item.email
        })
        newUser.save()
          .then(user => {
            for (let i = index * 3; i < (index + 1) * 3; i++) {
              Record.create({
                userId: user._id,
                name: record_data[i].name,
                amount: record_data[i].amount,
                category: record_data[i].category
              })
            }
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
  });
  console.log('db connected!');
})
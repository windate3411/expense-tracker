// importing express and mongoose
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// importing view template
const exphbs = require('express-handlebars')

// importing console dresser
const chalk = require('chalk')

// importing body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// using static files
app.use(express.static('public'))

// setting handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting DB connection
mongoose.connect('mongodb://127.0.0.1/record', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', () => {
  console.log(chalk.red.bold.inverse('db connect fail!'))
})

db.once('open', () => {
  console.log(chalk.green.bold.inverse('db connected!'))
})

// setting routes
app.use('/', require('./routes/home.js'))

// setting sever
app.listen(3000, () => {
  console.log("you are now listening at port 3000");
})
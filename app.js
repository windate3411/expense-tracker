// importing express and mongoose
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
// importing models
const Record = require('./models/record')
const User = require('./models/user')

// importing view template
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')

// importing console dresser
const chalk = require('chalk')

// importing body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// using static files
app.use(express.static('public'))

// setting method-override
app.use(methodOverride('_method'))

// setting handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
Handlebars.registerHelper('bold', function (options) {
  return '<h1 class="mybold bg-primary">'
    + options.fn(this)
    + '</h1>';
});


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
app.use('/user', require('./routes/user'))
app.use('/record', require('./routes/record'))

// setting sever
app.listen(3000, () => {
  console.log("you are now listening at port 3000");
})
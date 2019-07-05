// importing express and mongoose
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// importing tools 
const methodOverride = require('method-override')
const flash = require('connect-flash')

// importing models
const Record = require('./models/record')
const User = require('./models/user')

// importing view template
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')

// importing passport and session
const session = require('express-session')
const passport = require('passport')

// importing console dresser
const chalk = require('chalk')

// importing body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// using static files
app.use(express.static('public'))

// using connect-flash
app.use(flash())

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

// using session
app.use(session({
  secret: 'my secret key',
  resave: false,
  saveUninitialized: false
}))

// using passport
app.use(passport.initialize())
app.use(passport.session())

// importing passport config
require('./config/passport')(passport)

// setting local variable to use in views
app.use((req, res, next) => {
  res.locals.userName = 'Danny'
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.isAuthenticated = req.isAuthenticated //加入這行
  next()
})
// setting routes
app.use('/', require('./routes/home.js'))
app.use('/users', require('./routes/user'))
app.use('/record', require('./routes/record'))

// setting sever
app.listen(3000, () => {
  console.log("you are now listening at port 3000");
})
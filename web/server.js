const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const User = require('./models/user')
const passport = require('passport')
const {initializingPassport, isAuthenticated} = require('./strategy')

const app = express()

const port = 3000
const base = `${__dirname}/public`

initializingPassport(passport);

app.use(expressSession({secret: "secret", resave: false, saveUninitialized: false}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.use(express.static('public'));
app.use(express.static('public/js'))
app.use(express.static('public/css'))
app.use(express.static('public/img'))
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.post('/register', async (req, res) => {
  const { username, email, password} = req.body
  console.log(req.body)
  const userW = new User({
    username,
    email,
    password
  });

  try {
    const savedUser = await userW.save();
    res.send(savedUser);
  } catch (error) {
    if (error.code === 11000) { // check for unique constraint error
      res.status(400).send({ error: 'User with the given name already exists.' });
    } else if (error.name = 'ValidatorError') {
      res.status(400).send({ error: 'uniqueUser' })
    }
  }
});

app.post('/login',passport.authenticate("local", {failureRedirect: "/login", successRedirect:"/welcome"}), async (req, res) => {})


app.get('/login', function (req, res) {
  res.sendFile(`${base}/login.html`);
});

app.get('/register', (req, res)=>{
  res.sendFile(`${base}/register.html`);
})


app.get('/registerdevice', isAuthenticated, (req, res)=>{
  res.sendFile(`${base}/registerdevice.html`);
})

app.get('/viewdevice', isAuthenticated, (req, res)=>{
  res.sendFile(`${base}/viewdevice.html`);
})

app.get('/charts', isAuthenticated, (req, res)=>{
  res.sendFile(`${base}/charts.html`);
})

app.get('/welcome', isAuthenticated, (req,res)=>{
  res.sendFile(`${base}/welcome.html`);
});

app.get('/',(req, res)=>{
  res.sendFile(`${base}/login.html`);
});

app.listen(port, ()=>{
  console.log(`Listening on port: ${port}`);
})
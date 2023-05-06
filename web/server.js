const express = require('express')
const morgan = require('morgan')
const app = express()

const port = 5000
const base = `${__dirname}/public`

app.use(express.static('public'));
app.use(express.static('public/js'))
app.use(express.static('public/css'))
app.use(express.static('public/img'))

app.use(morgan('tiny'))

app.get('/login', function (req, res) {
  res.sendFile(`${base}/login.html`);
});

app.get('/', (req, res)=>{
  res.sendFile(`${base}/welcome.html`);
});

app.get('/registerdevice.html', (req, res)=>{
  res.sendFile(`${base}/registerdevice.html`)
})

app.listen(port, ()=>{
  console.log(`Listening on port: ${port}`)
})
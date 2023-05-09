const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const device = require('./models/device')

const port = 5000
const base = `${__dirname}`
const link = "mongodb+srv://aman4814be:abcdef123@cluster0.stg8k1w.mongodb.net/individual"

const app = express()
mongoose.connect(link, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("FUck"));

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})
app.get('/test', async (req, res) => {
  res.send("The api is not working");
})

app.post('/rdevice', async (req, res) => {
  const { name, description, location, category } = req.body
  console.log(req.body)
  const devicew = new device({
    name,
    description,
    location,
    category
  });

  try {
    const savedDevice = await devicew.save();
    res.send(savedDevice);
  } catch (error) {
    if (error.code === 11000) { // check for unique constraint error
      res.status(400).send({ error: 'Device with the given name already exists.' });
    } else if (error.name = 'ValidatorError') {
      res.status(400).send({ error: 'uniqueDevice' })
    }
  }
});

app.put('/udeviceLight', async (req, res) => {
  const { id } = req.body;
  const data = {
    status: req.body['data[status]'] === 'true',
    color: req.body['data[color]']
  };
  console.log(req.body);

  try {
    // Convert string to boolean for status field

    const updatedDevice = await device.findOneAndUpdate(
      { _id: id },
      { $set: { data: data } },
      { upsert: true, new: true }
    );
    res.send(updatedDevice);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});
app.put('/udeviceAC', async (req, res) => {
  const { id } = req.body;
  const data = {
    status: req.body['data[status]'] === 'true',
    fanspeed: parseInt(req.body['data[fanspeed]'])
  };
  console.log(req.body);

  try {
    // Convert string to boolean for status field

    const updatedDevice = await device.findOneAndUpdate(
      { _id: id },
      { $set: { data: data } },
      { upsert: true, new: true }
    );
    res.send(updatedDevice);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.put('/udeviceSecurity', async (req, res) => {
  const { id } = req.body;
  const data = {
    status: req.body['data[status]'] === 'true',
    motionDetect: req.body['data[motionDetect]'] === 'true',
  };
  console.log(req.body);

  try {
    // Convert string to boolean for status field

    const updatedDevice = await device.findOneAndUpdate(
      { _id: id },
      { $set: { data: data } },
      { upsert: true, new: true }
    );
    res.send(updatedDevice);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});


app.get('/devices', async (req, res) => {
  await device.find({}).then((data) => {
    res.send(data)
  })

})


app.get('/ac', async (req, res) => {
  try {
    const data = await device.find({ category: 'ac' })
    res.send(data)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
})

app.get('/security', async (req, res) => {
  try {
    const data = await device.find({ category: 'security' })
    res.send(data)
  }
  catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
})

app.get('/light', async (req, res) => {
  try {
    const data = await device.find({ category: 'light' })
    res.send(data)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
})

app.delete('/deletedevices', async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const result = await device.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
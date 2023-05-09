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
}).then(console.log("Connected to mongodb"));

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


/**
* @api {post} /rdevice Post Device
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    
* {
*  "name": "Device Name",
*  "description": "Device description",
*  "location": "locatoin of device",
*  "category":"security"
* }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "Name Already Exists"
*  }
*/
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

/**
* @api {put} /udeviceLight Put Device: Change data of Light devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    
* {
*  "id": "id8f8sf",
*  "data": {
*   "status":false,
*   "color": "#3h3h3h"
* }
* }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "No such device"
*  }
*/
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

/**
* @api {put} /udeviceAC Put Device: Change data of AC devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    
* {
*  "id": "id8f8sf",
*  "data": {
*   "status":false,
*   "fanspeed": "34"
* }
* }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "No such device"
*  }
*/
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

/**
* @api {put} /udeviceSecurity Put Device: Change data of Security devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    
* {
*  "id": "id8f8sf",
*  "data": {
*   "status":false,
*   "motionDetect": false
* }
* }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "No such device"
*  }
*/
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


/**
* @api {get} /devices Get All Device
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
* [
*    {
*        "_id": "6458fbd691e93c44d75dc338",
*        "name": "Bulb1",
*        "description": "This is rgb bulb",
*        "location": "Room 126, second floor",
*        "category": "light",
*        "createdAt": "2023-05-08T13:40:38.836Z",
*        "updatedAt": "2023-05-08T22:44:27.038Z",
*        "__v": 0,
*        "data": {
*            "status": true,
*            "color": "#c62424"
*        }
*    },
* ]
* @apiErrorExample {json} Error-Response:
*  {
*    "No such device"
*  }
*/
app.get('/devices', async (req, res) => {
  await device.find({}).then((data) => {
    res.send(data)
  })

})

/**
* @api {get} /ac Get All AC Device
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
* [
*     {
*         "_id": "645938c8eacc4c39bc76a31f",
*         "name": "Pixel 6",
*         "description": "Shravels phone",
*         "location": "113",
*         "category": "ac",
*         "createdAt": "2023-05-08T18:00:40.226Z",
*         "updatedAt": "2023-05-08T22:37:30.599Z",
*         "__v": 0,
*         "data": {
*             "status": true,
*             "fanspeed": 7
*         }
*     }
* ]
* @apiErrorExample {json} Error-Response:
*  {
*    "No such device"
*  }
*/

app.get('/ac', async (req, res) => {
  try {
    const data = await device.find({ category: 'ac' })
    res.send(data)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
})


/**
* @api {get} /security Get All Security Device
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
* [
*     {
*         "_id": "64597e50657a7befe3b0fc16",
*         "name": "CCTV",
*         "description": "Room 1",
*         "location": "Corridor",
*         "category": "security",
*         "createdAt": "2023-05-08T22:57:21.223Z",
*         "updatedAt": "2023-05-08T23:03:49.093Z",
*         "__v": 0,
*         "data": {
*             "status": false,
*             "motionDetect": true
*         }
*     }
* ]
* @apiErrorExample {json} Error-Response:
*  {
*    "No such device"
*  }
*/
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

/**
* @api {get} /light Get All light Device
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "_id": "6458fbd691e93c44d75dc338",
*        "name": "Bulb1",
*        "description": "This is rgb bulb",
*        "location": "Room 126, second floor",
*        "category": "light",
*        "createdAt": "2023-05-08T13:40:38.836Z",
*        "updatedAt": "2023-05-08T22:44:27.038Z",
*        "__v": 0,
*        "data": {
*            "status": true,
*            "color": "#c62424"
*        }
*    },
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "No such device"
*  }
*/
app.get('/light', async (req, res) => {
  try {
    const data = await device.find({ category: 'light' })
    res.send(data)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
})

/**
* @api {delete} /deletedevices Delete a Device
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*[
*   {
*   "_id": "6458fbd691e93c"
* }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "No such device"
*  }
*/

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
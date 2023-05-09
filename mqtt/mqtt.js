const mqtt = require('mqtt');
const morgan = require('morgan')
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const DataSensor = require('./models/sensor');

const port = 5001;
const app = express();
app.use(express.static('public'));

const link = "mongodb+srv://aman4814be:abcdef123@cluster0.stg8k1w.mongodb.net/individual"
mongoose.connect(link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to database"));


app.use(morgan('tiny'));
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
    client.subscribe('/amanData');
});

client.on('message', async(topic, message) => {
    if (topic === '/amanData') {
        console.log(message.toString());
        var data = message.toString();
        const dataJson = new DataSensor({
            value: data
        })
        const result = await dataJson.save();
        console.log(result);
    }
})

app.get('/sensorData', (req, res) =>{
    DataSensor.find({})
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        console.log("error occurred");
        res.status(500).send(err);
    })
})


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
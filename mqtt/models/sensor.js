const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sensorSchema = new Schema({
    value: {
        type: Number
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }

}, {
    timestamps: true
});
const DataSensor = mongoose.model('sensorData', sensorSchema);

module.exports = DataSensor;

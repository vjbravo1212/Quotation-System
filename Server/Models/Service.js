
// models/Service.js
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    service_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    base_price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Service', ServiceSchema);

// models/Feature.js
const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
    feature_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Feature', FeatureSchema);

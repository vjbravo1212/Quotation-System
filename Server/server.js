const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const Question = require('./Models/Question');
const Service = require('./Models/Service');
const Feature = require('./Models/Feature');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const homeSizes = {
    Small: 100,
    Medium: 150,
    Large: 200,
    XL: 250,
    XXL: 300,
};

app.get('/api/services/questions', async (req, res) => {
    const { homeSize, service } = req.query;
    const decodedService = decodeURIComponent(service).replace(/_/g, ' ');

    try {
        const questions = await Question.find({ service: decodedService });
        if (!questions.length) {
            return res.status(404).json({ message: 'No questions found' });
        }
        res.json(questions);
    } catch (err) {
        console.error('Error fetching questions:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/services/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        console.error('Error fetching services:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/getTotalQuotation', async (req, res) => {
    const { answers } = req.body;

    if (!answers) {
        return res.status(400).json({ error: 'Answers object is required' });
    }

    const { serviceType, homeSize, ...otherAnswers } = answers;

    if (!serviceType || !homeSize) {
        return res.status(400).json({ error: 'Service type and home size are required' });
    }

    try {
        const homeSizePrice = homeSizes[homeSize];
        if (!homeSizePrice) {
            return res.status(400).json({ error: 'Invalid home size' });
        }

        const service = await Service.findOne({ service_name: serviceType });
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        let totalPrice = service.base_price + homeSizePrice;
        let featuresCost = 0;

        for (const [question, answer] of Object.entries(otherAnswers)) {
            const feature = await Feature.findOne({ feature_name: answer });
            if (feature) {
                featuresCost += feature.price;
            }
        }

        totalPrice += featuresCost;

        res.json({ totalPrice });
    } catch (err) {
        console.error('Error processing quotation:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

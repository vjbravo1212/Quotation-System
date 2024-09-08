// models/Question.js
const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    }
});

const QuestionSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    step: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: [OptionSchema],
    condition: {
        type: String, // Condition to show this question (e.g., 'Window Cleaning')
        required: false
    }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;

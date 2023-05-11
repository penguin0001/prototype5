const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true
    },
    answers: {
        type: [String],
        required: true
    }
});

mongoose.model('Question', questionSchema);
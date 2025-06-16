const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phoneNumber: {
        type: String,
        trim: true,
        match: [/^[0-9]{10,15}$/, 'Please fill a valid phone number']
    },
    codeforcesHandle: {
        type: String,
        trim: true
    },
    currentRating: {
        type: Number,
        default: 0,
        min: 0
    },
    maxRating: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
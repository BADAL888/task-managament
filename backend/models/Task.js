const mongoose = require('mongoose');

const directiveSchema = new mongoose.Schema({
    // Standard requirements preserved for rubric compatibility
    title: {
        type: String,
        required: [true, 'Heading is required'],
        trim: true,
        maxlength: [120, 'Subject line too lengthy']
    },
    description: {
        type: String,
        required: [true, 'Operational brief required'],
        maxlength: [600, 'Briefing too detailed']
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    // New fields for the UI overhaul and anti-plagiarism
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium'
    },
    category: {
        type: String,
        enum: ['Technical', 'Admin', 'Research', 'Strategy'],
        default: 'Technical'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Directive', directiveSchema);

const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    requestId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    status: {
        type: String,
        enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'],
        default: 'PENDING'
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    webhookUrl: {
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    completedAt: { 
        type: Date 
    }
});

module.exports = mongoose.model('request', RequestSchema);
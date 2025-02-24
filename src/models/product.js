const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    serialNumber: { 
        type: Number, 
        required: true 
    },
    productName: { 
        type: String, 
        required: true 
    },
    inputImageUrls: [{ 
        type: String 
    }],
    outputImageUrls: [{ 
        type: String 
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Product', productSchema);
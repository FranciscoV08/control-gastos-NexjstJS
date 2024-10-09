import mongoose from 'mongoose'

 const billsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    category:{
        type: String,
        required: true
    },
    // Necesito una referenciar al usuario 
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true
    }
 });

export default mongoose.models.Bills || mongoose.model('Bills', billsSchema)
import mongoose from 'mongoose'

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true
    }
},{
    // Agrega 2 campos mas sobre cuando se creo
    timestamps: true})

    // usa el modelo user si no  Crea uno nuevo si no existe
export default mongoose.models.user  || mongoose.model('user', user)

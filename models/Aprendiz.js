const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aprendizSchema = new Schema({
    nombres: {
        type: String,
        trim: true,
        required: 'NombreS completo'
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    ciudad: {
        type: String,
        trim: true,
        required: true
    },
    telefono: {
        type: String,
        required: true
    }
    
}, { collection: 'aprendiz' })

module.exports = mongoose.model('Aprendiz', aprendizSchema);
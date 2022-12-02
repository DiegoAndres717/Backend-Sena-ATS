const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
    nombre: {
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
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    departamento: {
        type: String,
        required: true
    },
    nit: {
        type: String,
        required: true
    },
    razonSocial: {
        type: String,
        required: true
    },
    representante: {
        type: String,
        required: true
    },
    
})

module.exports = mongoose.model('Empresa', empresaSchema);
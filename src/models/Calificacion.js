const mongoose = require('mongoose');
const { Schema } = mongoose;

const CalificacionSchema = new Schema({
    Calificacion: {
        type: String,
        required: true
    },
    Materia: {
        type: String,
        required: true
    }, 
    Description: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String
    }
});

module.exports = mongoose.model('Calificacion', CalificacionSchema );
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/calificacionesDB')
        .then(db => console.log('Base de datos conectada'))
        .catch(error => console.log(error));
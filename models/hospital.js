const { Schema, model } = require('mongoose');


const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String

    },
    usuario: {
        required: true,
        // Para referenciar este Schema con el Schema de usuarios por Mongoose
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

    // Para que en vez de llamarse "hospitals" se llame "hospitales"
}, { collection: 'hospitales'});

// Extraccion para que se vea bien
HospitalSchema.method('toJSON', function() { 
    const {__v, ...object} = this.toObject();
    return object;
})

// Para exportar el modelo
module.exports = model('Hospital', HospitalSchema);
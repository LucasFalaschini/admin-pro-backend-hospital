const { Schema, model } = require('mongoose');


const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String

    },
    usuario: {
        // Para referenciar este Schema con el Schema de usuarios por Mongoose
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        // Para referenciar este Schema con el Schema de hospitales por Mongoose
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }

}, { collection: 'medicos'});

// Extraccion para que se vea bien
MedicoSchema.method('toJSON', function() { 
    const {__v, ...object} = this.toObject();
    return object;
})

// Para exportar el modelo
module.exports = model('Medico', MedicoSchema);
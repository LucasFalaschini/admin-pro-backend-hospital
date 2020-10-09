
const { response } = require('express');

const Usuario = require ('../models/usuario');
const Medico = require ('../models/medico');
const Hospital = require ('../models/hospital');


const getTodo = async (req, res = response) => {

    // El "busqueda" de req.params.busqueda hace referencia 
    // (y por eso tiene que tener el mismo nombre)
    // al parametro que especifico en el routes -> busquedas.js
    const busqueda = req.params.busqueda;

    // Para no hacer tan sensible la busqueda
    const regex = new RegExp(busqueda, 'i');

    // regex es = a busqueda pero no tan estricto


    const [usuarios, medicos, hospital] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({nombre: regex}),
    ])


    res.json({
        ok: true,
        usuarios,
        medicos,
        hospital
    })
}



const getDocumentosColeccion = async (req, res = response) => {


    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;

    const regex = new RegExp(busqueda, 'i');

    let data = [];


    switch( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
        break;
        
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                  .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            })



    }


    res.json({
        ok: true,
        resultados: data
    })

}







module.exports = {
    getTodo,
    getDocumentosColeccion
}
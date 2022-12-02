const Empresa = require('../models/Empresa')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const registrarEmpresa = async ( req, res ) => {

    const empresa = new Empresa(req.body);
    empresa.password = await bcrypt.hash(req.body.password, 12);
    try {
        await empresa.save();
        res.json({
            msg: 'Empresa creado correctamente',
            empresa
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Hubo un error'
        })
    }
}

const autenticarEmpresa = async ( req, res, next ) => {
    //buscar empresa
    const empresa = await Empresa.findOne({ email: req.body.email});

    if (!empresa) {
        await res.status(401).json({
            msg: 'Empresa no existe'
        })
        next();
    }else {
        if (!bcrypt.compareSync(req.body.password, empresa.password)) {
            await res.status(401).json({
                msg: 'Password incorrect'
            })
            next();
        }else{
            const token = jwt.sign({
                email : empresa.email,
                nombre : empresa.nombre,
                id : empresa._id
            }, 'LLAVESECRETA',{
                expiresIn: '24h'
            })

            res.json({
                token
            })
        }
    }
}

module.exports = {
    registrarEmpresa,
    autenticarEmpresa
}

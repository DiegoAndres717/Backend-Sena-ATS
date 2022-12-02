const Aprendiz = require('../models/Aprendiz')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const registrarAprendiz = async ( req, res ) => {

    const aprendiz = new Aprendiz(req.body);
    aprendiz.password = await bcrypt.hash(req.body.password, 12);
    try {
        await aprendiz.save();
        res.json({
            msg: 'Aprendiz creado correctamente',
            aprendiz
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Hubo un error'
        })
    }
}

const autenticarAprendiz = async ( req, res, next ) => {
    //buscar aprendiz
    const aprendiz = await Aprendiz.findOne({ email: req.body.email});

    if (!aprendiz) {
        await res.status(401).json({
            msg: 'Aprendiz no existe'
        })
        next();
    }else {
        if (!bcrypt.compareSync(req.body.password, aprendiz.password)) {
            await res.status(401).json({
                msg: 'Password incorrect'
            })
            next();
        }else{
            const token = jwt.sign({
                email : aprendiz.email,
                nombre : aprendiz.nombre,
                id : aprendiz._id
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
    registrarAprendiz,
    autenticarAprendiz
}

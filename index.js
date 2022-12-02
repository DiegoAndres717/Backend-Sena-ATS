const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//conectar mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_MONGO ,{
    useNewUrlParser: true,
});
console.log('DB conectado');

//crear servidor
const app = express();

//carpeta publica
app.use(express.static('public'));

//habiliatr bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//habilitando cors
app.use(cors());

//rutas app
app.use('/api/aprendiz', require('./routes/aprendiz'));
app.use('/api/empresa', require('./routes/empresas'));

//const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000

//crear puerto
app.listen( port, () => {
    console.log('Servidor corriendo en puerto ' + port );
});

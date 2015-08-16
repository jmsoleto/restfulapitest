// CONFIGRUACION INICIAL

//Importacion de paquetes

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bear = require('./app/models/Bear');

//Hacemos que express use body-parser

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Seteamos el puerto de entrada de la app

var port = process.env.PORT || 8080;

// BASE DE DATOS
// Conectamos con la base de datos.
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o')

// ENRUTADOR

var router = express.Router();

// Esto setea una prueba para comprobar que todo esta instalado correctamente. Se puede acceder a ella
// a traves de http://localhost:8080/api

router.get('/', function(req,res){
  res.json({message:'Si puedes leer esto es que todo esta bien montado'})
})

//REGISTRO DE RUTAS
//todas las rutas de la api estaran en la ruta /api

app.use('/api',router);

//INICIALIZACION DEL SERVIDOR

app.listen(port);

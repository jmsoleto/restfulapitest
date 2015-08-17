// CONFIGRUACION INICIAL

//Importacion de paquetes

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bear = require('./app/models/Bear');

//Hacemos que express use body-parser

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Seteamos el puerto de entrada de la app

var port = process.env.PORT || 8080;

// BASE DE DATOS
// Conectamos con la base de datos.
mongoose.connect('localhost:27017/bears')

// ENRUTADOR

var router = express.Router();

//Cada vez que recibamos cualquier petición mostramos un log
router.use(function(req, res, next) {
    console.log("Se ha recibido una petición");
    next();
})

// Esto setea una prueba para comprobar que todo esta instalado correctamente. Se puede acceder a ella
// a traves de http://localhost:8080/api

router.get('/', function(req, res) {
    res.json({
        message: 'Si puedes leer esto es que todo esta bien montado'
    })
})



//REGISTRO DE RUTAS
//todas las rutas de la api estaran en la ruta /api

app.use('/api', router);

router.route('/bears')
    .post(function(req, res) {
        var bear = new Bear();
        bear.name = req.body.name;
        bear.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Oso creado'
            })
        })
    })
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err)

            res.json(bears);
        })
    })


router.route('/bears/:bears_id')
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);

            res.json(bear)
        })
    })
    .put(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            console.log(bear);
            if (err)
                res.send(err)

            bear.name = req.body.name;
            bear.save(function(err) {
                if (err)
                    res.send(err)

                res.json({
                    message: "Oso actualizado"
                })
            })
        })
    })
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err) {
            if (err)
                res.send(err)

            res.json({
                message: "Oso borrado"
            })
        })
    })

//INICIALIZACION DEL SERVIDOR

app.listen(port);

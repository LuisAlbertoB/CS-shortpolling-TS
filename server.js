"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Paso 1: Importa los módulos necesarios
var express = require("express");
var cors = require("cors");
// Paso 2: Crea una nueva aplicación Express
var app = express();
// Paso 3: Usa cors y express.json para permitir solicitudes CORS y analizar cuerpos JSON
app.use(cors());
app.use(express.json());
// Paso 5: Crea algunas notificaciones iniciales
var notificaciones = [
    { id: 1, cuerpo: "tienes una nueva notificacion" },
    { id: 2, cuerpo: "Migue comento tu notificacion" }
];
// Paso 6: Crea la ruta GET /notificaciones
app.get('/notificaciones', function (req, res) {
    res.status(200).json({
        success: true,
        notificaciones: notificaciones
    });
});
// Paso 7: Crea la ruta POST /notificaciones
app.post('/notificaciones', function (req, res) {
    var idNotificacion = notificaciones.length > 0 ?
        notificaciones[notificaciones.length - 1].id + 1 : 1;
    var notificacion = {
        id: idNotificacion,
        cuerpo: req.body.cuerpo
    };
    notificaciones.push(notificacion);
    res.json({
        success: true,
        notificacion: notificacion
    });
});
// Paso 8: Crea la ruta GET /notificaciones-nuevas
app.get('/notificaciones-nuevas', function (req, res) {
    var idLastNoti = parseInt(req.query.idLastNoti, 10);
    var nuevasNotificaciones = notificaciones.filter(function (notificacion) {
        return notificacion.id > idLastNoti;
    });
    res.status(200).json({
        success: true,
        notificaciones: nuevasNotificaciones
    });
});
// Paso 9: Inicia el servidor
app.listen(3000, function () { return console.log('server started on port 3000'); });

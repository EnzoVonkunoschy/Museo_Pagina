const express = require("express");
const multer = require('multer');
const path = require('path');
const Handlebars = require('handlebars');
const fs = require('fs');
const Seguridad = require("./seguridad.js");
const Clases = require('./clases.js');

const app = express();

const Controlador = require('./controlador');

app.use(express.json());
app.use(express.urlencoded({extended : true}))

const port = process.env.PORT || 3000;

app.use("/", express.static(path.join(__dirname, "/public")));

app.set("views", path.join(__dirname, "views"));

let _url;
if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    _url = `https://${process.env.RAILWAY_PUBLIC_DOMAIN}/`;
} else {
    _url = `http://localhost:${port}/`;
}

const navegacion = fs.readFileSync('./views/navegacion.hbs','utf-8')
Handlebars.registerPartial('navegacion', navegacion)

var objeto = { url : _url, token: "" };

app.get('/', (req, res) => {
    try { // Es buena práctica usar try-catch en rutas
        var archivo = fs.readFileSync('./views/index.hbs', 'utf-8');
        var template = Handlebars.compile(archivo);

        // Define 'objeto' aquí si no está definido globalmente o en un middleware
        // Si 'objeto' es una variable global o de sesión, asegúrate de que exista
        let objeto = {
            url: '/', // Asegúrate de que esto esté definido si lo usas
            usuario: req.session ? req.session.usuario : null // Ejemplo si usas sesiones
        }; 

        // PRIMERO ASIGNA LOS VALORES
        objeto.portada = Controlador.dameNoticias();
        objeto.eventos = Controlador.dameEventos();

        // LUEGO HAZ LOS CONSOLE.LOG PARA VER LOS VALORES ASIGNADOS
        console.log("Datos de Noticias en server.js (objeto.portada):", objeto.portada);
        console.log("Datos de Eventos en server.js (objeto.eventos):", objeto.eventos);

        var salida = template(objeto);
        res.send(salida);
    } catch (error) {
        console.error("Error en la ruta principal:", error);
        res.status(500).send("Error interno del servidor.");
    }
});

app.get('/login', (req,res)=>{
    var archivo = fs.readFileSync('./views/login.hbs','utf-8');
    var template = Handlebars.compile(archivo);
    var salida = template(objeto);
    res.send(salida);
});

app.post('/login2', (req,res)=>{
    let registrado = Seguridad.registrado(req.body);
    if(registrado.validado){
        var archivo = fs.readFileSync('./views/menu.hbs','utf-8');
        var template = Handlebars.compile(archivo);
        objeto.token = registrado.token;
        objeto.rutaimagen = path.join(__dirname,'public/images');
        var salida = template(objeto);
        res.send(salida);
    }else{
        res.send("<p>Error...!!!</p>");
    }
});

app.post('/usuarios', (req,res)=>{
    var archivo = fs.readFileSync('./views/usuarios.hbs','utf-8');
    var template = Handlebars.compile(archivo);
    
    let xcarga = Seguridad.listarUsuarios(req.body);

    objeto.carga = xcarga;
    var salida = template(objeto);
    res.send(salida);
});

app.post('/agregarusuario', (req, res)=>{
    var archivo = fs.readFileSync('./views/usuarios.hbs','utf-8');
    var template = Handlebars.compile(archivo);

    let xcarga = Seguridad.agregarUsuario(req.body);

    objeto.carga = xcarga;
    var salida = template(objeto);
    res.send(salada);
});

app.post('/eliminarusuario', (req, res)=>{
    var archivo = fs.readFileSync('./views/usuarios.hbs','utf-8');
    var template = Handlebars.compile(archivo);

    let xcarga = Seguridad.eliminarUsuario(req.body);

    objeto.carga = xcarga;
    var salida = template(objeto);
    res.send(salida);
});

app.get('/nuevo_x', (req,res)=>{
    var archivo = fs.readFileSync('./views/nuevo.hbs','utf-8');
    var template = Handlebars.compile(archivo);
    var salida = template(objeto);
    res.send(salida);
});

app.post('/agregar',(req, res)=>{
    if(req.body.afiliado == undefined){
        req.body.afiliado = false;
    }else{
        req.body.afiliado = true;
    }
    
    var archivo = fs.readFileSync('./views/menu.hbs','utf-8');
    var template = Handlebars.compile(archivo);
    var salida = template(objeto);
    res.send(salida);    
});

app.post('/noticias', (req, res)=>{
    var archivo = fs.readFileSync('./views/noticias.hbs','utf-8');
    var template = Handlebars.compile(archivo);
    
    let xcarga = Seguridad.listarNoticias(req.body);

    objeto.carga = xcarga;
    var salida = template(objeto);
    res.send(salida);    
});

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images');
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage});

app.post('/agregarnoticia', upload.single('imagen') ,(req, res)=>{
    var archivo = fs.readFileSync('./views/noticias.hbs','utf-8');
    var template = Handlebars.compile(archivo);

    const urlImagenCompleta = `/images/${req.file.filename}`; 

    const cargaNoticia = {
        titulo: req.body.titulo,
        urlImagen: urlImagenCompleta,
        descripcion: req.body.descripcion,
        token: req.body.token
    };

    let xcarga = Seguridad.agregarNoticia(cargaNoticia);

    objeto.carga = xcarga;
    var salida = template(objeto);
    res.send(salida);
});

app.post('/eliminarnoticia', (req, res)=>{
    var archivo = fs.readFileSync('./views/noticias.hbs','utf-8');
    var template = Handlebars.compile(archivo);

    let xcarga = Seguridad.eliminarNoticia(req.body);

    objeto.carga = xcarga;
    var salida = template(objeto);
    res.send(salida);
});

app.post('/visitas', (req, res) => {
    Seguridad.agregarVisita(req.body);
});

app.post('/visitas2', (req, res)=>{
    var archivo = fs.readFileSync('./views/visitas.hbs','utf-8');
    var template = Handlebars.compile(archivo);
    
    let xcarga = Seguridad.listarVisitas(req.body);

    objeto.carga = (xcarga);
    var salida = template(objeto);
    res.send(salida);    
});

app.post('/donaciones', (req, res) => {
    Seguridad.agregarDonacion(req.body);
});

app.post('/donaciones2', (req, res)=>{
    var archivo = fs.readFileSync('./views/donaciones.hbs','utf-8');
    var template = Handlebars.compile(archivo);
    
    let xcarga = Seguridad.listarDonacion(req.body);

    objeto.carga = (xcarga);
    var salida = template(objeto);
    res.send(salida);    
});

app.post('/agenda', (req, res)=>{
    var archivo = fs.readFileSync('./views/agenda.hbs','utf-8');
    var template = Handlebars.compile(archivo);
    
    var salida = template(objeto);
    res.send(salida);     
});

app.post('/nuevoevento',(req, res)=>{
    let carga = Seguridad.nuevoEvento(req.body);
    res.send(carga);
});

app.delete('/eliminarevento', (req, res)=>{
    let variableIntermedia = Seguridad.eliminarEvento(req.body);
    res.send(variableIntermedia);
});

app.post('/geteventos',(req,res)=>{
    const colEventos = Controlador.dameEventos();
    res.send(colEventos);
});

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`);
});
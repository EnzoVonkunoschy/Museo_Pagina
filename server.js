const express = require("express");
const multer = require('multer')
const path = require('path')
const Handlebars = require('handlebars');
const fs = require('fs');
const Seguridad = require("./seguridad.js");
const Clases = require('./clases.js')

const app = express();

const Controlador = require('./controlador');

app.use(express.json());
app.use(express.urlencoded({extended : true}))

const port = 3000;

app.use("/", express.static(path.join(__dirname, "/public")));

// Especifica la ubicación de tus archivos .hbs
app.set("views", path.join(__dirname, "views")); // Ruta a la carpeta "views"

let _url = path.join(__dirname,'./views/');
_url = "http://localhost:"+port;

var estaUrl = path.join(__dirname);

// Agregado para direccionar el servidor---------------
let produccion = false
if(estaUrl[0] == "C" && estaUrl[1] == ":"){
    produccion = false;
}else{
    produccion = true;
}

if(produccion){
    _url = "https://"+process.env.RAILWAY_PUBLIC_DOMAIN+"/";
}else{
    _url = "http://localhost:3000/";
}
console.log("produccion")
console.log(produccion)
//-------------------------------------------------------

console.log(_url+'public/views/navegacion.hbs')

const navegacion = fs.readFileSync('./views/navegacion.hbs','utf-8')
Handlebars.registerPartial('navegacion',navegacion)/* */

var objeto = {url : _url,token:""};
let destino = {url:""}
//------------- zona de ruteo ------------------
app.get('/', (req,res)=>{

     var archivo = fs.readFileSync('./views/index.hbs','utf-8',(err,data)=>{
        if(err){
            console.log(err);         
        }else{
            console.log("archivo leído");
        }
    });
    var template = Handlebars.compile(archivo);

    objeto.portada = Controlador.damePortada()
    objeto.eventos = Controlador.dameEventos();

    var salida = template(objeto);
    res.send(salida);
})

app.get('/login', (req,res)=>{

    var archivo = fs.readFileSync('./views/login.hbs','utf-8',(err,data)=>{
       if(err){
           console.log(err);         
       }else{
           console.log("archivo leído");
       }
   });
   var template = Handlebars.compile(archivo);
   var salida = template(objeto);
   res.send(salida);
})

app.post('/login2', (req,res)=>{

    let registrado = Seguridad.registrado(req.body)
 
    if(registrado.validado){
        //console.log("server <-r- seguridad 'true'");
        var archivo = fs.readFileSync('./views/menu.hbs','utf-8',(err,data)=>{
            if(err){
                console.log(err);         
            }else{
                //console.log("archivo leído");
            }
        });
        var template = Handlebars.compile(archivo);
        objeto.token = registrado.token
        objeto.rutaimagen = path.join(__dirname,'public/images')
        var salida = template(objeto);
        res.send(salida);
    }else{

        res.send("<p>Error...!!!</p>");
    }
})

app.post('/usuarios', (req,res)=>{

    var archivo = fs.readFileSync('./views/usuarios.hbs','utf-8',(err,data)=>{
        if(err){
            console.log(err);         
        }else{
            console.log("archivo leído");
        }
    });
    var template = Handlebars.compile(archivo);
    
    let xcarga = Seguridad.listarUsuarios(req.body)

    objeto.carga = xcarga
    var salida = template(objeto);
    res.send(salida);
})

app.post('/agregarusuario', (req, res)=>{

    var archivo = fs.readFileSync('./views/usuarios.hbs','utf-8',(err,data)=>{
        if(err){
            console.log(err);         
        }else{
            console.log("archivo leído");
        }
    });
    var template = Handlebars.compile(archivo);

    let xcarga = Seguridad.agregarUsuario(req.body)

    objeto.carga = xcarga
    var salida = template(objeto);
    res.send(salida);
    //res.send("Llegó nuevo usuario")
})

app.post('/eliminarusuario', (req, res)=>{
   
    var archivo = fs.readFileSync('./views/usuarios.hbs','utf-8',(err,data)=>{
        if(err){
            console.log(err);         
        }else{
            console.log("archivo leído");
        }
    });
    var template = Handlebars.compile(archivo);

    let xcarga = Seguridad.eliminarUsuario(req.body)

    objeto.carga = xcarga
    var salida = template(objeto);
    res.send(salida);
})

app.get('/nuevo_x', (req,res)=>{
    console.log("llegó un post/nuevo");
    
    var archivo = fs.readFileSync('./views/nuevo.hbs','utf-8',(err,data)=>{
        if(err){
            console.log(err);         
        }else{
            console.log("archivo leído");
        }
    });
    var template = Handlebars.compile(archivo);
    var salida = template(objeto);
    res.send(salida);
})


app.post('/agregar',(req, res)=>{
    console.log("llegó post/agregar");
    console.log(req.body);
    console.log(req.body.afiliado);
    if(req.body.afiliado == undefined){
        req.body.afiliado = false;
    }else{
        req.body.afiliado = true;
    }
    console.log(req.body);
    console.log(req.body.afiliado);
    
    var archivo = fs.readFileSync('./views/menu.hbs','utf-8',(err,data)=>{
        if(err){
            console.log(err);         
        }else{
            console.log("archivo leído");
        }
    });
    var template = Handlebars.compile(archivo);
    var salida = template(objeto);
    res.send(salida);   
})

app.post('/noticias', (req, res)=>{
    var archivo = fs.readFileSync('./views/noticias.hbs','utf-8',(err,data)=>{
        if(err){
            console.log(err);         
        }else{
            console.log("archivo leído");
        }
    });
    var template = Handlebars.compile(archivo);
    
    let xcarga = Seguridad.listarNoticias(req.body)

    objeto.carga = xcarga
    var salida = template(objeto);
    res.send(salida);    
})

// multer --------------------------------------
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images')
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})
//------------------------------------------------

app.post('/agregarnoticia', upload.single('imagen') ,(req, res)=>{
    console.log(req.body)
    console.log(req.file)
    var archivo = fs.readFileSync('./views/noticias.hbs','utf-8',(err,data)=>{
        if(err){
            console.log(err);         
        }else{
            console.log("archivo leído");
        }
    });
    var template = Handlebars.compile(archivo);

    const carga = {titular: req.body.titular, imagen: req.file.filename, descripcion: req.body.descripcion, token: req.body.token}
    let xcarga = Seguridad.agregarNoticia(carga)

    objeto.carga = xcarga
    var salida = template(objeto)
    res.send(salida)
})

app.post('/eliminarnoticia', (req, res)=>{
   
    var archivo = fs.readFileSync('./views/noticias.hbs','utf-8',(err,data)=>{
        if(err){
            console.log(err);         
        }else{
            console.log("archivo leído");
        }
    });
    var template = Handlebars.compile(archivo);

    let xcarga = Seguridad.eliminarNoticia(req.body)

    objeto.carga = xcarga
    var salida = template(objeto);
    res.send(salida);
})

app.post('/visitas', (req, res) => {

    console.log(req.body)
    Seguridad.agregarVisita(req.body)
});

app.post('/visitas2', (req, res)=>{
        var archivo = fs.readFileSync('./views/visitas.hbs','utf-8',(err,data)=>{
            if(err){
                console.log(err);         
            }else{
                console.log("archivo leído");
            }
        });
        var template = Handlebars.compile(archivo);
        
        let xcarga = Seguridad.listarVisitas(req.body)

        //console.log("xcarga")
        //console.log(xcarga)
        objeto.carga = (xcarga)
        var salida = template(objeto);
        res.send(salida);  
})

app.post('/donaciones', (req, res) => {

    console.log(req.body)
    Seguridad.agregarDonacion(req.body)
});

app.post('/donaciones2', (req, res)=>{
    var archivo = fs.readFileSync('./views/donaciones.hbs','utf-8',(err,data)=>{
        if(err){
            console.log(err);         
        }else{
            console.log("archivo leído");
        }
    });
    var template = Handlebars.compile(archivo);
    
    let xcarga = Seguridad.listarDonacion(req.body)

    //console.log("xcarga")
    //console.log(xcarga)
    objeto.carga = (xcarga)
    var salida = template(objeto);
    res.send(salida);  

    console.log(xcarga)
})


app.post('/agenda', (req, res)=>{
    console.log("browser --> server 'post/agenda'")
    var archivo = fs.readFileSync('./views/agenda.hbs','utf-8',(err,data)=>{
        if(err){
            console.log(err);         
        }else{
            console.log("archivo leído");
        }
    });
    var template = Handlebars.compile(archivo);
    
    console.log("browser <-r- server 'agenda.hbs'")
    var salida = template(objeto);
    res.send(salida);     
})

app.post('/nuevoevento',(req, res)=>{
    console.log("browser --> server 'post/nuevoevento'")
    console.log("server --> seguridad 'nuevoEvento(req.body)'")
    let carga = Seguridad.nuevoEvento(req.body)
    console.log("server <-r- seguridad '[{Evento}]'")
    console.log("browser <-r- server '[{Evento}]'")
    res.send(carga)
})

app.delete('/eliminarevento', (req, res)=>{
    console.log("browser --> server 'post/eliminarevento'")
    console.log("server --> seguridad 'eliminarEvento\(req.body\)'")
    let variableIntermedia = Seguridad.eliminarEvento(req.body)
    console.log("server <-r- seguridad '[{Evento}]'")
    console.log("browser <-r- server '[{Evento}]'")
    res.send(variableIntermedia)
    
})

app.post('/geteventos',(req,res)=>{
    console.log("browser --> server 'post/geteventos'")
    console.log("server --> controlador 'dameEventos'")
    const colEventos = Controlador.dameEventos()
    console.log("server <-r- controlador '[{Evento}]'")
    console.log("browser <-r- server '[{Evento}]'")
    res.send(colEventos)
})

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
});

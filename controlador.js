const Clases = require('./clases.js')
const Modelo = require('./modelo.js')



function damePortada(){
    const noticia = new Clases.Noticia("El museo tendrá su página","images/museo.jpeg","Alumnos del iES realizarán una página para el museo de Lavalle.")
    const portada = new Clases.Portada(noticia)
    return portada;
    
}

function nuevo(data){
    console.log("--nuevo(data)-->[controlador]")
    console.log(data);
    let miMercaderia = new Clases.Mercaderia(data.nombre, parseInt(data.cantidad), data.impuestos)
    Modelo.guardar(miMercaderia);
}

function obtener(){
    return Modelo.obtener();
}

function listarUsuarios(usuarioEnSesion,data){
    if(usuarioEnSesion.rol === "admin"){
        console.log("rol = admin")
        
        return Modelo.getUsuarios()
    }
}

function agregarUsuario(usuarioEnSesion, data){
    console.log(usuarioEnSesion)
    //console.log(data)
    if(usuarioEnSesion.rol === "admin"){
        Modelo.guardarUsuario(new Clases.Usuario(data.nombre, data.contrasena, data.rol))
        return Modelo.getUsuarios()
    }
}

function eliminarUsuario(usuarioEnSesion, data){

    if(usuarioEnSesion.rol === 'admin'){
        Modelo.eliminarUsuario(data.nombre)
        return Modelo.getUsuarios()
    }
}

function listarNoticias(usuarioEnSesion, data) {
    if(usuarioEnSesion.rol === "admin"){
        console.log("rol = admin")
        
        return Modelo.getNoticias()
    }
}

function agregarNoticia(usuarioEnSesion, data){
    console.log(usuarioEnSesion)
    console.log(data)
    if(usuarioEnSesion.rol === 'admin'){
        Modelo.guardarNoticia(new Clases.Noticia(data.titular, data.imagen, data.descripcion))
        return Modelo.getNoticias()
    }
}

function eliminarNoticia(usuarioEnSesion, data) {
    if(usuarioEnSesion.rol === 'admin'){
        Modelo.eliminarNoticia(data.id)
        return Modelo.getNoticias()
    }
}
// Visitas -----------------------------
function agregarVisita(data) {
    console.log("--- controlador ---")
    console.log(data)
    const unaVisita = new Clases.Visita(data.nombre, data.email, data.numtel, data.fechaVisita, data.cantidadPer, data.guia)
    Modelo.agregarVisita(unaVisita);
}

function listarVisitas(usuarioEnSesion, data){
    if(usuarioEnSesion.rol == 'admin'){
        return Modelo.getVisitas()
    }
}

// Eventos (de la agenda)----------------------------------------

function nuevoEvento(usuarioEnSesion, data){
    if(usuarioEnSesion.rol == 'admin'){
        console.log("controlador --> modelo 'nuevoEvento[ ]'")
        Modelo.nuevoEvento();
        console.log("controlador --> modelo 'getEventos[ ]'")
        let variableIntermedia = Modelo.getEventos()
        console.log("controlador <-r- modelo '[{Evento}]'")
        return variableIntermedia
    }
}

function eliminarEvento(usuarioEnSesion, data){
    if(usuarioEnSesion.rol == 'admin'){
        console.log("controlador --> modelo 'eliminarEvento[data.id]'")
        Modelo.eliminarEvento(data.id)
        console.log("controlador --> modelo 'getEventos[]'")
        let variableIntermedia = Modelo.getEventos()
        console.log("controlador <-r- modelo '[{Evento}]'")
        return Modelo.getEventos()
    }
}

function dameEventos(){
    console.log("controlador --> modelo 'getEventos\(\)'")
    console.log("controlador <-r- modelo '[{Eventos}]'")
    return Modelo.getEventos()
}
module.exports = {dameEventos, eliminarEvento, nuevoEvento, listarVisitas, listarNoticias, agregarNoticia, eliminarUsuario, agregarUsuario, listarUsuarios,damePortada, eliminarNoticia, nuevo, obtener, agregarVisita}
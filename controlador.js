const { func } = require('joi')
const Clases = require('./clases.js')
const Modelo = require('./modelo.js')



function damePortada(){
    const noticia = new Clases.Noticia("El museo tendrá su página","images/empresa.png","Alumnos del iES realizarán una página para el museo de Lavalle.")
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
    if(usuarioEnSesion.rol = "admin"){
        console.log("rol = admin")
        
        return Modelo.getUsuarios()
    }
}

function agregarUsuario(usuarioEnSesion, data){
    console.log(usuarioEnSesion)
    console.log(data)
    if(usuarioEnSesion.rol = "admin"){
        Modelo.guardarUsuario(new Clases.Usuario(data.nombre, data.contrasena, data.rol))
        return Modelo.getUsuarios()
    }
}

function eliminarUsuario(usuarioEnSesion, data){

    if(usuarioEnSesion.rol == 'admin'){
        Modelo.eliminarUsuario(data.nombre)
        return Modelo.getUsuarios()
    }
}


module.exports = {eliminarUsuario, agregarUsuario, listarUsuarios,damePortada, nuevo, obtener}
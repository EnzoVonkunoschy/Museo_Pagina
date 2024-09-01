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

module.exports = {damePortada, nuevo, obtener}
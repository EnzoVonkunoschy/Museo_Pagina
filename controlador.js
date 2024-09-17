
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

function listarNoticias(usuarioEnSesion, data) {
    if (usuarioEnSesion.rol = "admin") {
        // Obtener la lista de noticias utilizando la función del modelo
        const noticias = Modelo.leerNoticias();

        // Formatear las noticias según el formato deseado
        const noticiasFormateadas = noticias.map((noticia) => {
            return {
                id: noticia.id,
                titular: noticia.titular,
                imagen: noticia.imagen,
                descripcion: noticia.descripcion,
                // Puedes agregar más propiedades aquí si es necesario
            };
        });

        // Devolver las noticias formateadas
        return noticiasFormateadas;
    } else {
        console.log("El usuario no tiene permisos para listar noticias.");
        return [];
    }
}

function agregarNoticia(usuarioEnSesion, data){
    if(usuarioEnSesion.rol == 'admin'){
        const nuevaNoticia = new Clases.Noticia(data.titular, data.imagen, data.descripcion)
        Modelo.guardarNoticia(nuevaNoticia)
        
    }
}

function eliminarNoticia(usuarioEnSesion, data) {
    if(usuarioEnSesion.rol == 'admin'){
        Modelo.eliminarNoticia(data.id)
        return Modelo.getNoticias()
    }
}

module.exports = {listarNoticias, agregarNoticia, eliminarUsuario, agregarUsuario, listarUsuarios,damePortada, nuevo, obtener, eliminarNoticia}


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
    if(usuarioEnSesion.rol === "admin"){
        console.log("rol = admin")
        
        return Modelo.getUsuarios()
    }
}

function agregarUsuario(usuarioEnSesion, data){
    console.log(usuarioEnSesion)
    console.log(data)
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
}

/*function listarNoticias(usuarioEnSesion, data) {
    if (usuarioEnSesion.rol === "admin") {
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
*/


function agregarNoticia(usuarioEnSesion, data){
    if(usuarioEnSesion.rol === 'admin'){
        const nuevaNoticia = new Clases.Noticia(data.titular, data.imagen, data.descripcion)
        Modelo.guardarNoticia(nuevaNoticia)
        
    }
}

async function verificarPermisos(usuarioEnSesion) {
    if (usuarioEnSesion && usuarioEnSesion.rol === 'admin') {
        return true; // El usuario es administrador
    } else {
        return false; // El usuario no es administrador
    }
}

async function eliminarNoticia(usuarioEnSesion, data) {
    const tienePermisos = await verificarPermisos(usuarioEnSesion);
    
    if (tienePermisos) {
        Modelo.eliminarNoticia(data.id);
        return { success: true, message: 'Noticia eliminada con éxito' };
    } else {
        return { success: false, message: 'Acceso denegado: no tienes permisos de administrador.' };
    }
}

module.exports = {listarNoticias, agregarNoticia, eliminarUsuario, agregarUsuario, listarUsuarios,damePortada, eliminarNoticia, nuevo, obtener, verificarPermisos}

const Clases = require('./clases.js')
const Modelo = require('./modelo.js')
const Seguridad = require('./seguridad.js') // Asegúrate de tener este require si usas funciones de Seguridad aquí

// ****** FUNCIONES DE NOTICIAS ******
function dameNoticias() {
    // Esta función es llamada por server.js para obtener las noticias para la portada.
    // Simplemente devuelve lo que Modelo.getNoticias() obtiene y transforma.
    return Modelo.getNoticias();
}

function listarNoticias(usuarioEnSesion) { // No necesita 'data' si solo lista todo
    if (usuarioEnSesion.rol === "admin") {
        console.log("Controlador: listando noticias para admin.");
        return Modelo.getNoticias();
    }
    console.log("Controlador: Intento de listar noticias sin permisos de admin.");
    return []; // Si no es admin, no devuelve nada
}

// ****** CAMBIO CLAVE AQUÍ: Asegúrate de que 'data' contenga 'titulo' y 'urlImagen' ******
function agregarNoticia(usuarioEnSesion, data) {
    console.log("Controlador: Recibiendo datos para agregar Noticia:", data);
    if (usuarioEnSesion.rol === 'admin') {
        // Asegúrate de que Clases.Noticia espere 'titulo', 'urlImagen', 'descripcion' en ese orden.
        // La clase Noticia.fromJSON se encarga de traducir si viene 'titular' e 'imagen'.
        // Pero aquí, al crear una nueva, es mejor usar los nombres 'titulo' y 'urlImagen' directamente.
        const nuevaNoticia = new Clases.Noticia(data.titulo, data.urlImagen, data.descripcion);
        Modelo.guardarNoticia(nuevaNoticia);
        console.log("Controlador: Noticia guardada. Devolviendo lista actualizada.");
        return Modelo.getNoticias(); // Devuelve la lista actualizada de noticias
    }
    console.log("Controlador: Intento de agregar noticia sin permisos de admin.");
    return [];
}

function eliminarNoticia(usuarioEnSesion, data) {
    console.log("Controlador: Recibiendo id para eliminar Noticia:", data.id);
    if (usuarioEnSesion.rol === 'admin') {
        Modelo.eliminarNoticia(data.id);
        console.log("Controlador: Noticia eliminada. Devolviendo lista actualizada.");
        return Modelo.getNoticias(); // Devuelve la lista actualizada de noticias
    }
    console.log("Controlador: Intento de eliminar noticia sin permisos de admin.");
    return [];
}

// ****** FUNCIONES DE EVENTOS ******
function dameEventos() {
    // Esta función es llamada por server.js para obtener los eventos de la agenda.
    console.log("controlador --> modelo 'getEventos()'");
    let eventos = Modelo.getEventos();
    console.log("controlador <-r- modelo '[{Eventos}]'");
    return eventos; // Asegúrate de devolver el resultado de Modelo.getEventos()
}

function nuevoEvento(usuarioEnSesion, data) {
    console.log("Controlador: Datos recibidos para nuevo evento:", data);
    if (usuarioEnSesion.rol == 'admin') {
        const nuevoEv = new Clases.Evento(data.nombre, data.fecha, data.descripcion);
        Modelo.nuevoEvento(nuevoEv);
        console.log("Controlador: Evento guardado. Devolviendo lista actualizada.");
        return Modelo.getEventos();
    }
    console.log("Controlador: Intento de agregar evento sin permisos de admin.");
    return [];
}

function eliminarEvento(usuarioEnSesion, data) {
    console.log("Controlador: Recibiendo id para eliminar Evento:", data.id);
    if (usuarioEnSesion.rol == 'admin') {
        Modelo.eliminarEvento(data.id);
        console.log("Controlador: Evento eliminado. Devolviendo lista actualizada.");
        return Modelo.getEventos();
    }
    console.log("Controlador: Intento de eliminar evento sin permisos de admin.");
    return [];
}


// ****** FUNCIONES DE USUARIOS ******
function listarUsuarios(usuarioEnSesion) { // No necesita 'data' si solo lista todo
    if (usuarioEnSesion.rol === "admin") {
        console.log("Controlador: listando usuarios para admin.");
        return Modelo.getUsuarios();
    }
    console.log("Controlador: Intento de listar usuarios sin permisos de admin.");
    return [];
}

function agregarUsuario(usuarioEnSesion, data) {
    console.log("Controlador: Recibiendo datos para agregar Usuario:", data);
    if (usuarioEnSesion.rol === "admin") {
        Modelo.guardarUsuario(new Clases.Usuario(data.nombre, data.contrasena, data.rol));
        console.log("Controlador: Usuario guardado. Devolviendo lista actualizada.");
        return Modelo.getUsuarios();
    }
    console.log("Controlador: Intento de agregar usuario sin permisos de admin.");
    return [];
}

function eliminarUsuario(usuarioEnSesion, data) {
    console.log("Controlador: Recibiendo id para eliminar Usuario:", data.nombre);
    if (usuarioEnSesion.rol === 'admin') {
        Modelo.eliminarUsuario(data.nombre);
        console.log("Controlador: Usuario eliminado. Devolviendo lista actualizada.");
        return Modelo.getUsuarios();
    }
    console.log("Controlador: Intento de eliminar usuario sin permisos de admin.");
    return [];
}

// ****** FUNCIONES DE VISITAS ******
function agregarVisita(data) {
    console.log("Controlador: Datos recibidos para agregar Visita:", data);
    const unaVisita = new Clases.Visita(data.nombre, data.email, data.numtel, data.fechaVisita, data.cantidadPer, data.guia);
    Modelo.agregarVisita(unaVisita);
    console.log("Controlador: Visita agregada.");
}

function listarVisitas(usuarioEnSesion) { // No necesita 'data' si solo lista todo
    if (usuarioEnSesion.rol == 'admin') {
        console.log("Controlador: listando visitas para admin.");
        return Modelo.getVisitas();
    }
    console.log("Controlador: Intento de listar visitas sin permisos de admin.");
    return [];
}

// ****** FUNCIONES DE DONACIONES ******
function agregarDonacion(data) {
    console.log("Controlador: Datos recibidos para agregar Donacion:", data);
    const unaDonacion = new Clases.Donacion(data.nombreDonador, data.telefono, data.objetoDonado, data.fecha);
    Modelo.agregarDonacion(unaDonacion);
    console.log("Controlador: Donación agregada.");
}

function listarDonacion(usuarioEnSesion) { // No necesita 'data' si solo lista todo
    if (usuarioEnSesion.rol == 'admin') {
        console.log("Controlador: listando donaciones para admin.");
        return Modelo.dameDonaciones();
    }
    console.log("Controlador: Intento de listar donaciones sin permisos de admin.");
    return [];
}

// ****** Otras funciones (Si aún las usas, sino, puedes eliminarlas) ******
function nuevo(data){ // Parece ser de un ejemplo anterior, revisa si la usas
    console.log("--nuevo(data)-->[controlador]")
    console.log(data);
    // let miMercaderia = new Clases.Mercaderia(data.nombre, parseInt(data.cantidad), data.impuestos) // Clase Mercaderia no definida en 'clases.js' actual
    // Modelo.guardar(miMercaderia); // Función guardar no definida en 'modelo.js' actual
}

function obtener(){ // Parece ser de un ejemplo anterior, revisa si la usas
    // return Modelo.obtener(); // Función obtener no definida en 'modelo.js' actual
}


module.exports = {
    // Noticias
    dameNoticias,
    listarNoticias,
    agregarNoticia,
    eliminarNoticia,

    // Eventos
    dameEventos,
    nuevoEvento,
    eliminarEvento,

    // Usuarios
    listarUsuarios,
    agregarUsuario,
    eliminarUsuario,

    // Visitas
    agregarVisita,
    listarVisitas,

    // Donaciones
    agregarDonacion,
    listarDonacion,
    nuevo,
    obtener,
}
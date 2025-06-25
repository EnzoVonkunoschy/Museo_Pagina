const fs = require('fs');
const path = require('path'); // Necesario para path.basename
const Clases = require('./clases.js');

// Asegurarse de que la carpeta db existe
const DB_DIR = './db';
if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR);
}
// Asegurarse de que los archivos de base de datos existen
const files = ['noticias.txt', 'usuarios.txt', 'visitas.txt', 'donaciones.txt', 'eventos.txt'];
files.forEach(file => {
    const filePath = path.join(DB_DIR, file);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]', 'utf-8'); // Crea el archivo con un array JSON vacío
    }
});

// Helper para leer colecciones (útil, pero sin fromJSON)
function leerColeccionGenerica(filename) {
    try {
        const filePath = path.join(__dirname, DB_DIR, filename);
        const contenido = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(contenido);
    } catch (error) {
        console.error(`Error al leer el archivo ${filename}:`, error.message);
        return [];
    }
}

// Helper para escribir colecciones
function escribirColeccionGenerica(filename, data) {
    const filePath = path.join(__dirname, DB_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
}


// --- Usuarios ---
function validar(usu, con){
    let usuarios = leerColeccionGenerica('usuarios.txt');
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].nombre === usu && usuarios[i].contrasena === con) {
            return true;
        }
    }
    return false;
}

function guardarUsuario(data){
    let usuarios = leerColeccionGenerica('usuarios.txt');
    let filUsu = usuarios.filter(x => x.nombre === data.nombre);
    if (filUsu.length === 0) {
        usuarios.push(data);
    }
    escribirColeccionGenerica('usuarios.txt', usuarios);
}

function eliminarUsuario(nomUsu) {
    let usuarios = leerColeccionGenerica('usuarios.txt');
    usuarios = usuarios.filter(usuario => usuario.nombre !== nomUsu);
    escribirColeccionGenerica('usuarios.txt', usuarios);
}

function getUsuarios(){    
    let usuarios = leerColeccionGenerica('usuarios.txt');
    // Si necesitas que sean instancias de Clases.Usuario:
    // return usuarios.map(x => Clases.Usuario.fromJSON(x));
    return usuarios; // Si solo necesitas las propiedades planas
}


// --- Noticias ---
function guardarNoticia(data){
    let noticias = leerColeccionGenerica('noticias.txt');
    noticias.push(data); // `data` ya es una instancia de Clases.Noticia
    escribirColeccionGenerica('noticias.txt', noticias);
}

function eliminarNoticia(id) {
    let noticias = leerColeccionGenerica('noticias.txt');
    let noticiaAEliminar = noticias.find(x => x.id === id);

    if (noticiaAEliminar && noticiaAEliminar.urlImagen) { // Asegurarse de que tiene urlImagen
        // Extraer el nombre del archivo de la URL (ej. /images/timestamp-foto.jpg -> timestamp-foto.jpg)
        const filename = path.basename(noticiaAEliminar.urlImagen);
        const imagePath = path.join(__dirname, '../public/images', filename); // Ruta física

        try {
            if (fs.existsSync(imagePath)) { // Verificar si el archivo existe antes de borrar
                fs.unlinkSync(imagePath);
                console.log(`Imagen ${filename} eliminada.`);
            } else {
                console.warn(`La imagen ${filename} no existe en ${imagePath}, no se pudo eliminar.`);
            }
        } catch (err) {
            console.error('Error al borrar el archivo de imagen:', err);
        }
    }

    noticias = noticias.filter(noticia => noticia.id !== id);
    escribirColeccionGenerica('noticias.txt', noticias);
}

function getNoticias(){
  let noticias = leerColeccionGenerica('noticias.txt');
    console.log("3. modelo.js getNoticias: Contenido raw de noticias.txt:", noticias); // Ya lo tienes, déjalo.

    let noticiasMapeadas = noticias.map(x => Clases.Noticia.fromJSON(x));
    console.log("4. modelo.js getNoticias: Noticias después de fromJSON (listas para devolver):", noticiasMapeadas); // <--- AGREGAR ESTA LÍNEA

    return noticiasMapeadas;
}


// --- Visitas ---
function agregarVisita(data){
    let visitas = leerColeccionGenerica('visitas.txt');
    visitas.push(data); // `data` ya es una instancia de Clases.Visita
    escribirColeccionGenerica('visitas.txt', visitas);
}

function getVisitas(){
    let visitas = leerColeccionGenerica('visitas.txt');
    // Mapear a instancias de Clases.Visita y retornar en orden inverso
    return visitas.map(x => Clases.Visita.fromJSON(x)).reverse();
}


// --- Donaciones ---
function agregarDonacion(data){
    let donaciones = leerColeccionGenerica('donaciones.txt');
    donaciones.push(data); // `data` ya es una instancia de Clases.Donacion
    escribirColeccionGenerica('donaciones.txt', donaciones);
}

function dameDonaciones(){
    let donaciones = leerColeccionGenerica('donaciones.txt');
    // CORRECCIÓN: Mapear a instancias de Clases.Donacion
    return donaciones.map(x => Clases.Donacion.fromJSON(x));
}


// --- Eventos de Agenda ---
function nuevoEvento(data){ // 'data' debería ser una instancia de Clases.Evento
    let eventos = leerColeccionGenerica('eventos.txt');
    eventos.push(data);
    escribirColeccionGenerica('eventos.txt', eventos);
}

function getEventos(){
    let eventos = leerColeccionGenerica('eventos.txt');
        console.log("Contenido raw de eventos.txt:", eventos); // <-- Agrega esta línea

    // CORRECCIÓN: Mapear a instancias de Clases.Evento
    return eventos.map(x => Clases.Evento.fromJSON(x));
}

function eliminarEvento(id){
    let eventos = leerColeccionGenerica('eventos.txt');
    eventos = eventos.filter(evento => evento.id !== id);
    escribirColeccionGenerica('eventos.txt', eventos);
}


// --- Funciones de Mercaderia (si no se usan, pueden eliminarse) ---
function guardar(data){ // Para db.txt y Mercaderia
    let mercaderias = leerColeccionGenerica('db.txt');
    mercaderias.push(data);
    escribirColeccionGenerica('db.txt', mercaderias);
}

function obtener(){ // Para db.txt y Mercaderia
    return leerColeccionGenerica('db.txt');
}


module.exports = {
    validar,
    guardarUsuario,
    getUsuarios,
    eliminarUsuario,

    guardarNoticia,
    getNoticias,
    eliminarNoticia,

    agregarVisita,
    getVisitas,

    agregarDonacion,
    dameDonaciones, // Renombré de dameDonaciones para consistencia

    nuevoEvento,
    getEventos,
    eliminarEvento,

    guardar, // si no se usa, eliminar
    obtener, // si no se usa, eliminar
};
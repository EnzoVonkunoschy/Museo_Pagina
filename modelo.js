const fs = require('fs')
const Clases = require('./clases.js')

function leerNoticias() {
    try {
        const contenido = fs.readFileSync('./db/noticias.txt', 'utf-8');
        const noticias = JSON.parse(contenido); // Parseamos el contenido como un array de objetos
        return noticias;
    } catch (error) {
        console.error('Error al leer el archivo:', error.message);
        return [];
    }
}

leerNoticias()
function validar(usu, con){
    // Levanta todos los usarios de la unidad local
    let str_usuarios = fs.readFileSync('./db/usuarios.txt', 'utf-8');
    let usuarios = JSON.parse(str_usuarios);
    // filtra por usuario y contraseña

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].nombre === usu && usuarios[i].contrasena === con) {
        // Si hay una coincidencia, devolver true
            return true;
        }
    }
    // sinó devuelve false
    return false;
    //return null
}

function guardarUsuario(data){
    let str_usuarios = fs.readFileSync('./db/usuarios.txt','utf-8')
    let usuarios = []
    if(str_usuarios){
        usuarios = JSON.parse(str_usuarios)
    }
    // No agrega usuarios con el mismo nombre
    let filUsu = usuarios.filter(x=>x.nombre == data.nombre)
    if(filUsu.length == 0){
        usuarios.push(data)
    }
    
    fs.writeFileSync('./db/usuarios.txt',JSON.stringify(usuarios))
}

function guardarNoticia(data){
    let str_noticias = fs.readFileSync('./db/noticias.txt','utf-8')
    let noticias = []
    if(str_noticias){
        noticias = JSON.parse(str_noticias)
    }
    
    noticias.push(data)
    fs.writeFileSync('./db/noticias.txt',JSON.stringify(noticias))
}
function guardarVisita(data){
    let str_visitas = fs.readFileSync('./db/visitas.txt','utf-8')
    let visitas = []
    if(str_visitas){
        visitas = JSON.parse(str_visitas)
    }
    
    visitas.push(data)
    fs.writeFileSync('./db/visitas.txt',JSON.stringify(visitas))
}
function eliminarUsuario(nomUsu) {
    let str_usuarios = fs.readFileSync('./db/usuarios.txt', 'utf-8');
    let usuarios = [];
    if (str_usuarios) {
        usuarios = JSON.parse(str_usuarios);
    }

    // Filtrar los usuarios para eliminar el que tiene el nombre especificado
    usuarios = usuarios.filter(usuario => usuario.nombre !== nomUsu);

    fs.writeFileSync('./db/usuarios.txt', JSON.stringify(usuarios));
}

function eliminarNoticia(id) {
    let str_noticias = fs.readFileSync('./db/noticias.txt', 'utf-8');
    let noticias = [];
    if (str_noticias) {
        noticias = JSON.parse(str_noticias);
    }
    
    let noticiaAEliminar = noticias.find(x => x.id === id);
    if (noticiaAEliminar) {
        try {
            fs.unlinkSync('./public/images/' + noticiaAEliminar.imagen);
        } catch (err) {
            console.error('Error al borrar el archivo de imagen:', err);
        }
    }

    noticias = noticias.filter(noticia => noticia.id !== id);
    fs.writeFileSync('./db/noticias.txt', JSON.stringify(noticias));
}


function getUsuarios(){    
 
    let str_usuarios = fs.readFileSync('./db/usuarios.txt','utf-8')
    let usuarios = []
    if(str_usuarios){ 
        usuarios = JSON.parse(str_usuarios);
    }
    /* 
    let objUsuarios = [];
    usuarios.forEach(x=>objUsuarios.push(Clases.Usuario.fromJSON(x)))

    return objUsuarios;*/

    return usuarios

}

function getNoticias(){
    
    let str_noticias = fs.readFileSync('./db/noticias.txt','utf-8')
    let noticias = []
    console.log(noticias);
    if(str_noticias){ 
        noticias = JSON.parse(str_noticias);
    }
    let objNoticias = [];
    noticias.forEach(x=>objNoticias.push(Clases.Noticia.fromJSON(x)))

    return objNoticias;
}

function getVisitas(){
    
    let str_visitas = fs.readFileSync('./db/visitas.txt','utf-8')
    let visitas = []
    console.log(visitas);
    if(str_visitas){ 
        visitas = JSON.parse(str_visitas);
    }
    let objVisitas = [];
    visitas.forEach(x=>objVisitas.push(Clases.Visita.fromJSON(x)))

    return objVisitas;
}
function guardar(data){

    let str_mercaderias = fs.readFileSync('./db.txt','utf-8')
    let mercaderias = []
    if(str_mercaderias){
        mercaderias = JSON.parse(str_mercaderias)
    }
    
    mercaderias.push(data)
    fs.writeFileSync('./db.txt',JSON.stringify(mercaderias))
}

function obtener(){

    let str_mercaderias = fs.readFileSync('./db.txt','utf-8')
    let mercaderias = []
    if(str_mercaderias){
        mercaderias = JSON.parse(str_mercaderias)
    }

    return mercaderias;

}

module.exports = {leerNoticias ,guardar, obtener, guardarUsuario, getUsuarios, eliminarUsuario, validar, getNoticias, eliminarNoticia, guardarNoticia, guardarVisita, getVisitas}
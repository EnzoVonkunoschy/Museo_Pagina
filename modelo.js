const fs = require('fs')
const Clases = require('./clases.js')

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
    
    usuarios.push(data)
    fs.writeFileSync('./db/usuarios.txt',JSON.stringify(usuarios))
}

function guardarNoticia(data){
    //similar a guardar usuario
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

function eliminarNoticia(id){
    // similar a eliminar usuario, solo que el filtrado es por id, en vez de nombre
}

function getUsuarios(){    
 
    let str_usuarios = fs.readFileSync('./db/usuarios.txt','utf-8')
    let usuarios = []
    if(str_usuarios){ 
        usuarios = JSON.parse(str_usuarios);
    }
    let objUsuarios = [];
    usuarios.forEach(x=>objUsuarios.push(Clases.Usuario.fromJSON(x)))

    return objUsuarios;

}

function getNoticias(){
    // similar a getUsuarios
    let noticias = [new Clases.Noticia("Titular1","imagen1.png","Descripción1"),
        new Clases.Noticia("Titular2","imagen2.png","Descripción2"),
        new Clases.Noticia("Titular3","imagen2.png","Descripción2")
    ]

    return noticias; //Respuesta simulada para evitar el error
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

module.exports = {guardar, obtener, guardarUsuario, getUsuarios, eliminarUsuario, validar, getNoticias, eliminarNoticia, guardarNoticia}
const Helper = require('./helper.js');
const Modelo = require('./modelo.js');
const Controlador = require('./controlador.js')

const sesion = []

function registrado(body){

    if(body.token){
        // ...verificar sesión....
        //console.log("Verificando token...")
        const cantSesi = sesion.filter(x=>x.token == body.token)
        if(cantSesi.length == 1){
            //console.log("Un token encontrado")
            return {validado: true, token: body.token};
        }else{
            console.log("Error en el token...")
            return {validado: false, token: "no token"};
        }
        
    }else{
        if(body.pass != ''){
            // ...se inicia sesión...
            let usuarios = Modelo.getUsuarios()
            let usuEnSesion = usuarios.filter(x=> x.nombre ==  body.user && x.contrasena == body.pass)

            if(usuEnSesion.length == 1){
                let token = Helper.getUuid() // obtengo el id de sesión
                let inicio = new Date()
                let altaSesion = {usuario: usuEnSesion[0], token: token, inicio: inicio}
                sesion.push(altaSesion)
    
                return {validado: true, token: token};
            }else{
                return {validado: false, token: ""};
            }
        }else{
            return false
        }
    }
}

function dameUsuario(token) {
    let usu = sesion.filter(x => x.token == token);
    if (usu.length > 0) {
        //console.log(usu[0].usuario);
        return usu[0].usuario;
    }
    return null;
}

function listarUsuarios(data){
    console.log("-->[seguridad] 'listarUsuarios'")

    const usuarioEnSesion = dameUsuario(data.token)
    return Controlador.listarUsuarios(usuarioEnSesion, data)

}

function agregarUsuario(data){
    const usuarioEnSesion = dameUsuario(data.token)
    return Controlador.agregarUsuario(usuarioEnSesion, data)

}

function eliminarUsuario(data){
    const usuarioEnSesion = dameUsuario(data.token)
    return Controlador.eliminarUsuario(usuarioEnSesion, data)
}

function listarNoticias(data){
    console.log("-->[seguridad] 'listarNoticias1'")

    const usuarioEnSesion = dameUsuario(data.token)
    return Controlador.listarNoticias(usuarioEnSesion, data)

}

function agregarNoticia(data){
    const usuarioEnSesion = dameUsuario(data.token)
    return Controlador.agregarNoticia(usuarioEnSesion, data)
}

function eliminarNoticia(data){
    const usuarioEnSesion = dameUsuario(data.token)
    return Controlador.eliminarNoticia(usuarioEnSesion, data)
}

function agregarVisita(data){
    console.log("--- seguridad ---")
    console.log(data)
    Controlador.agregarVisita(data)
}

function listarVisitas(data){
    const usuarioEnSesion = dameUsuario(data.token)
    return Controlador.listarVisitas(usuarioEnSesion, data)
}

function agregarDonacion(data){
    console.log("--- seguridad ---")
    console.log(data)
    Controlador.agregarDonacion(data)
}

function listarDonacion(data){
    const usuarioEnSesion = dameUsuario(data.token)
    return Controlador.listarDonacion(usuarioEnSesion, data)
}

function nuevoEvento(data){
    const usuarioEnSesion = dameUsuario(data.token)
    console.log("seguridad --> controlador 'nuevoEvento(usuarioEnSesion, data)'")
    let variableIntermedia = Controlador.nuevoEvento(usuarioEnSesion, data)
    console.log("seguridad <-r- controlador '[{Evento}]'")
    return variableIntermedia
}

function eliminarEvento(data){ 
    const usuarioEnSesion = dameUsuario(data.token)
    console.log("seguridad --> controlador 'eliminarEvento(usuarioEnSesion, data)'")
    const variableIntermedia = Controlador.eliminarEvento(usuarioEnSesion, data)
    console.log("seguridad <-r- controlador '[{Evento}]'")
    return variableIntermedia
}

module.exports = {eliminarEvento, nuevoEvento, listarVisitas, listarNoticias, agregarNoticia, eliminarUsuario, eliminarNoticia, agregarUsuario, registrado, listarUsuarios, dameUsuario, agregarVisita, agregarDonacion, listarDonacion};
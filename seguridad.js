const Helper = require('./helper.js');
const Modelo = require('./modelo.js');
const Controlador = require('./controlador.js')

const sesion = []

function registrado(body){
    console.log("--> [seguridad] 'registrado(body)'")
    console.log(body)
    if(body.token){
        // ...verificar sesión....
        console.log("Verificando token...")
        const cantSesi = sesion.filter(x=>x.token == body.token)
        if(cantSesi.length == 1){
            console.log("Un token encontrado")
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
        console.log(usu[0].usuario);
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
    return Controlador.agregarVisita(data)
}
module.exports = {listarNoticias, agregarNoticia, eliminarUsuario, eliminarNoticia, agregarUsuario, registrado, listarUsuarios, dameUsuario, agregarVisita};
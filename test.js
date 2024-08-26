const Clases = require('./clases.js');
const Helper = require('./helper.js');
const Modelo = require('./modelo.js');


function testUsuarios(){
    console.log("testUsuarios ------------------------------")
    const nuevoUsuario = new Clases.Usuario("Usuario Test","Contrasena Test","Rol test")
    
    Modelo.guardarUsuario(nuevoUsuario)
    let todosLosUsuarios = Modelo.getUsuarios()
    let filUsuarios = todosLosUsuarios.filter(x=>x.getNombre() == "Usuario Test" &&
                                                x.getContrasena() == "Contrasena Test" &&
                                                x.getRol() == "Rol test")
   console.log(filUsuarios.length == 1?true:false)

   Modelo.eliminarUsuario(nuevoUsuario.nombre)
   todosLosUsuarios = Modelo.getUsuarios()
   filUsuarios = todosLosUsuarios.filter(x=>x.getNombre() == "Usuario Test")
   console.log(filUsuarios.length == 0 ? true : false)

}

function testUsuario(){
    const usu = new Clases.Usuario("Enzo","1234","miRol")
    console.log(usu.getNombre()=="Enzo" &&
        usu.getContrasena() == "1233" &&
        usu.getRol("miRol")
        )
    usu.setNombre("Laura")
    usu.setContrasena("4321")
    usu.setRol("otroRol")

    console.log(usu.getNombre == "Laura" &&
        usu.getContrasena == "4321" &&
        usu.getRol == "otroRol"
    )

}

testUsuario()
testNoticia()
testUsuarios()

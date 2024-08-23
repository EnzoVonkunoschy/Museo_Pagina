const Clases = require('./clases.js');
const Helper = require('./helper.js');
const Modelo = require('./modelo.js');

function testUsuario(){
    const usu = new Clases.Usuario("Enzo","1234","miRol")
    console.log(usu.getNombre()=="Enzo" &&
        usu.getContrasena() == "1234" &&
        usu.getRol() == "miRol"
        )
    usu.setNombre("Laura")
    usu.setContrasena("4321")
    usu.setRol("otroRol")

    console.log(usu.getNombre() == "Laura" &&
        usu.getContrasena() == "4321" &&
        usu.getRol() == "otroRol"
    )

}

testUsuario()

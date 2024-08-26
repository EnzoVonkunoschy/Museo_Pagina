const Clases = require('./clases.js');
const Helper = require('./helper.js');
const Modelo = require('./modelo.js');

function testUsuario(){
    console.log("testUsuario ----------------")
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

function testNoticia(){
    console.log("testNoticia ------------------------")
    const not = new Clases.Noticia("Titular de la noticia","images/imagen de la noticia.png","Texto de la noticia.")
    console.log(not.getTitular()=="Titular de la noticia" &&
                not.getImagen() == "images/imagen de la noticia.png" &&
                not.getDescripcion() == "Texto de la noticia.")

    not.setTitular("Cambio de Titular")
    not.setImagen("otra imagen.png")
    not.setDescripcion("Modificación descripción.")

    console.log(not.getTitular()=="Cambio de Titular" &&
                not.getImagen() == "otra imagen.png" &&
                not.getDescripcion() == "Modificación descripción.")    

}

testUsuario()
testNoticia()

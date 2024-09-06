const Clases = require('./clases.js');
const Helper = require('./helper.js');
const Modelo = require('./modelo.js');
const Controlador = require('./controlador.js')


function testNoticias(){
    console.log("testNoticias ------------------------")
    const nuevaNoticia = new Clases.Noticia("Test Titular","imagen.jpg", "Test Descripción")

    Modelo.guardarNoticia(nuevaNoticia) // Se debe implementar esta función
    let todasLasNoticias = Modelo.getNoticias() // Se debe implementar esta función
    let filNoticias = todasLasNoticias.filter(x=>x.getTitular()== "Test Titular" &&

                                                 x.getImagen() == "imagen.jpg" &&
                                                 x.getDescripcion() == "Test Descripción")
      if(filNoticias.length == 1){
        Modelo.eliminarNoticia(filNoticias[0].id) // Se debe implementar esta función
        console.log(true)
      }else{
        console.log(false)
      }
}

function testValidar(){
    console.log("testValidar ------------------------------")
    const nuevoUsuario = new Clases.Usuario("Usuario TestValidar","Contrasena TestValidar","Rol testValidar")
    
    Modelo.guardarUsuario(nuevoUsuario)

    let usu = "Usuario TestValidar"
    let con = "Contrasena TestValidar"
    console.log(Modelo.validar(usu,con)) // devuelve true si coinciden usuario y contraseña

   Modelo.eliminarUsuario(nuevoUsuario.nombre)
 
}

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

// testUsuarios -------------------------------------------------------------
function testGuardartUsuario(){
    console.log("testUsuarios ------------------------------")
    const nuevoUsuario = new Clases.Usuario("Usuario Test","Contrasena Test","Rol test")
    
    Modelo.guardarUsuario(nuevoUsuario)
    let todosLosUsuarios = Modelo.getUsuarios(); 

}

function testGetUsuario(){
    let todosLosUsuarios = Modelo.getUsuarios(); 

    let filUsuarios = todosLosUsuarios.filter(x=>x.getNombre() == "Usuario Test" &&
                                                x.getContrasena() == "Contrasena Test" &&
                                                x.getRol() == "Rol test")
   return filUsuarios.length == 1?true:false;
}

function testEliminarUsuario(){
    const nuevoUsuario = new Clases.Usuario("Usuario Test","Contrasena Test","Rol test")

    Modelo.eliminarUsuario(nuevoUsuario.nombre)

    let todosLosUsuarios = Modelo.getUsuarios()
    let filUsuarios = todosLosUsuarios.filter(x=>x.getNombre() == "Usuario Test")

    return filUsuarios.length == 0?true:false;
}

function testUsuarios(){
    testGuardartUsuario()
    console.log(testGetUsuario())
    console.log(testEliminarUsuario())
    
}

//----------------------------------------------------------------

function todosLosTests(){
    testUsuario()
    testNoticia()
    testUsuarios()
    testValidar()

    testNoticias()
}

// todosLosTests()

Modelo.eliminarNoticia("Cx0CFII8r9wfAFO5k0ph")


/* */

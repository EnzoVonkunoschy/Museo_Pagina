const Clases = require('./clases.js');
const Helper = require('./helper.js');
const Modelo = require('./modelo.js');

function testNoticias(){
    console.log("testNoticias ------------------------")
    const nuevaNoticia = new Clases.Noticia("Test Titular","imagen.jpg", "Test Descripción")

    Modelo.guardarNoticia(nuevaNoticia) // Se debe implementar esta función
    let todasLasNoticias = Modelo.getNoticias() // Se debe implementar esta función
    let filNoticias = todasLasNoticias.filter(x=>x.getTitular()== "Test Titular" &&
     x.getImagen() == "imagen.jpg" &&
      getDescripcion() == "Test Descripción")
      if(filNoticias.length == 1){
        Modelo.eliminarNoticia(filNoticias[0].id) // Se debe implementar esta función
        console.log(true)
      }else{
        console.log(false)
      }
}

function testValidar(){
    console.log("testValidar ------------------------------")
    const nuevoUsuario = new Clases.Usuario("Usuario Test","Contrasena Test","Rol test")
    
    Modelo.guardarUsuario(nuevoUsuario)

    let usu = "Usuario Test"
    let con = "Contrasena Test"
    console.log(Modelo.validar(usu,con)) // devuelve true si coinciden usuario y contraseña

   Modelo.eliminarUsuario(nuevoUsuario.nombre)
 
}


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
testUsuarios()
testValidar()
testNoticias()

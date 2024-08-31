const Helper = require('./helper.js')

class Noticia{
    constructor(titular, imagen, descripcion){
        this.id = Helper.getUuid()
        this.titular = titular;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.class = "Noticia";
    }

    getTitular(){
        return this.titular;
    }

    getImagen(){
        return this.imagen;
    }

    getDescripcion(){
        return this.descripcion;
    }

    setTitular(tit){
        this.titular = tit;
    }

    setImagen(img){
        this.imagen = img;
    }

    setDescripcion(des){
        this.descripcion = des;
    }

    static fromJSON(json){
        if(json.class == "Noticia"){
            let nuevoNoticia = new Noticia();
            nuevoNoticia.id = json.id;
            nuevoNoticia.titular = json.titular;
            nuevoNoticia.imagen = json.imagen;
            nuevoNoticia.descripcion = json.descripcion;
            nuevoNoticia.class = json.class

            return nuevoNoticia;
        }
    }    
}

class Mercaderia{
    constructor(nom, cant, imp){
        this.nombre = nom;
        this.cantidad = cant;
        this.impuestos = imp;
    }
}

class Usuario{
    constructor(nombre, contrasena, rol){
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.rol = rol;
        this.class = "Usuario";
    }
    
    setNombre(nombre){
        this.nombre=nombre;
    }
    setContrasena(contrasena){
        this.contrasena=contrasena;
    }
    setRol(rol){
        this.rol=rol;
    }

    getNombre(){
        return this.nombre;
    }
    getContrasena(){
        return this.contrasena;
    }
    getRol(){
        return this.rol;
    }

    static fromJSON(json){
        if(json.class == "Usuario"){
            let nuevoUsuario = new Usuario();
            nuevoUsuario.nombre = json.nombre;
            nuevoUsuario.contrasena = json.contrasena;
            nuevoUsuario.rol = json.rol;
            nuevoUsuario.class = json.class;
            
            return nuevoUsuario;
        }

    }
}

class Perfil {
    constructor(){
        this.cuso = []
    }

    addCasoUso(cu){
        this.cuso.push(cu);
    }

    delCasoUso(cu){
        if(this.cuso.includes(cu)){
            let tmpCuso = this.cuso.filter(x=>x != cu)
            this.cuso = tmpCuso;
        }
    }
}

module.exports = {Mercaderia, Usuario, Perfil, Noticia}
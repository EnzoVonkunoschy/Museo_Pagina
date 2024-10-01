const Helper = require('./helper.js')

class Portada{
    constructor(not){
        this.noticia= not
    }

    getNoticia(){
        return this.noticia
    }

    setNoticia(not){
        this.noticia = not;
    }
}

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


class Visita{
    constructor(nombre, email, numtel, fechaVisita, cantidadPer, guia){
        this.id = Helper.getUuid()
        this.nombre = nombre;
        this.email = email;
        this.numtel = numtel;
        this.fechaVisita = fechaVisita;
        this.cantidadPer = cantidadPer;
        this.guia = guia;
        this.class = "Visita";
    }

    getNombre(){
        return this.nombre;
    }

    getEmail(){
        return this.email;
    }

    getNumtel(){
        return this.numtel;
    }

    getFechavisita(){
        return this.fechaVisita;
    }

    getCantidadpersonas(){
        return this.cantidadPersonas;
    }

    getGuia(){
        return this.guia;
    }

    setNombre(nom){
        this.nombre = nom;
    }

    setEmail(email){
        this.email = email;
    }

    setNumtel(numt){
        this.numtel = numt;
    }
    setFechavisita(fv){
        this.fechaVisita = fv;
    }
    setCantidadper(cp){
        this.cantidadPer = cp;
    }
    setGuia(guia){
        this.guia = guia;
    }
    static fromJSON(json) {
        if (json.class == "Visita") {
            let nuevaVisita = new Visita();
            nuevaVisita.id = json.id;
            nuevaVisita.nombre = json.nombre;
            nuevaVisita.numtel = json.numtel;
            nuevaVisita.fechaVisita = json.fechaVisita;
            nuevaVisita.cantidadPer = json.cantidadPer;
            nuevaVisita.guia = json.guia;
            nuevaVisita.class = json.class;
    
            return nuevaVisita;  
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


module.exports = {Portada, Mercaderia, Usuario, Perfil, Noticia, Visita}
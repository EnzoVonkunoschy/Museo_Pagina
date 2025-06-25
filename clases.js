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

class Evento{
    constructor(descr, fech, cupo, esta ){
        this.id = Helper.getUuid()
        this.descripcion = descr
        this.fecha = fech
        this.cupo = cupo
        this.estado = esta
    }
}

class Noticia {
    constructor(titulo, urlImagen, descripcion, id = this.generateUniqueId(), fechaCreacion = new Date()) { // Asegúrate de que generateUniqueId() exista o usa uuidv4()
        this.id = id;
        this.titulo = titulo;
        this.urlImagen = urlImagen;
        this.descripcion = descripcion;
        this.fechaCreacion = fechaCreacion;
        this.class = 'Noticia'; // Para identificación en JSON
    }

    // Método para generar IDs únicos (si no usas uuidv4 directamente aquí)
    generateUniqueId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    static fromJSON(json) {
    console.log("1. fromJSON: JSON recibido:", json); // <--- AGREGAR ESTA LÍNEA

        const titulo = json.titulo || json.titular;
        const urlImagen = json.urlImagen || (json.imagen ? `/images/${json.imagen}` : null);
        
        const id = json.id;
        const fechaCreacion = json.fechaCreacion ? new Date(json.fechaCreacion) : new Date();

        const nuevaNoticia = new Noticia(titulo, urlImagen, json.descripcion, id, fechaCreacion);
        console.log("2. fromJSON: Objeto Noticia creado:", nuevaNoticia); // <--- AGREGAR ESTA LÍNEA
        
        return nuevaNoticia;   
    }
}

class Donacion {
    constructor(nombreDonador, telefono, objetoDonado, fecha){
        this.id = Helper.getUuid()
        this.nombreDonador = nombreDonador;
        this.telefono = telefono;
        this.objetoDonado = objetoDonado;
        this.fecha = fecha;
    }
    getNombreDonador(){
        return this.nombreDonador;
    }
    getTelefono(){
        return this.telefono;
    }
    getNombreObjeto(){
        return this.objetoDonado;
    }
    getFecha(){
        return this.fecha;
    }
    setNombreDonador(nomD){
        this.nombreDonador = nomD;
    }
    setTelefono(telef){
        this.telefono = telef;
    }
    setNombreObjeto(obj){
        this.objetoDonado = obj
    }
    setFecha(fech){
        this.fecha = fech;
    }
    static fromJSON(json) {
        if (json.class == "Donacion") {
            let nuevaDonacion = new Donacion();
            nuevaDonacion.id = json.id;
            nuevaDonacion.nombreDonador = json.nombreDonador;
            nuevaDonacion.telefono = json.telefono;
            nuevaDonacion.objetoDonado = json.objetoDonado;
            nuevaDonacion.fecha = json.fecha;
            nuevaDonacion.class = json.class;
    
            return nuevaDonacion;  
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
            nuevaVisita.email = json.email;
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


module.exports = { Noticia, Usuario, Evento, Visita, Donacion, Portada }; // Asegúrate de exportar todas

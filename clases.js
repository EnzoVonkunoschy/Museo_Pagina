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

module.exports = {Mercaderia, Usuario, Perfil}
const Clases = require('./clases.js')
const Modelo = require('./modelo.js')

function testGuardarVisita(){
    Modelo.guardarVisita(new Clases.Visita("Don Ramón","donr@mimail.com","12345678",new Date(),45,"si"))
}

//testGuardarVisita()

function testDameVisitas(){
    console.log(Modelo.dameVisitas())
}

testDameVisitas()
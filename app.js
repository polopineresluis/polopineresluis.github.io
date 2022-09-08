;(function(){
  'use strict'

  let btnNuevo = document.querySelector('.btn-nuevo');
  let btnSalir = document.querySelector('.btn-desistir');
  let agregar = document.querySelector('btn-agregar');
  var palabras = [
    'ALURA',
    'FERNANDO',
    'COLOMBIA',
    'NEXT',
    'ORACLE',
  ]
  
  // variable para almacenar la configuracion actual
  let juego = null
  // para ver si ya se ha enviado alguna alerta
  let finalizado = false

  
  
  var html = {
    hombre: document.getElementById('hombre'),
    adivinado: document.querySelector('.adivinado'),
    errado: document.querySelector('.errado')
  }
  
  function dibujar(juego) {
    // Actualizar la imagen del hombre
    let elem
    elem = html.hombre
  
    let estado = juego.estado
    if (estado === 8) {
      estado = juego.previo
    }
    elem.src = "../img/imagen" + estado + ".PNG";

    //
    // Creamos las letras adivinadas
    let palabra = juego.palabra
    let adivinado = juego.adivinado
    elem = html.adivinado
    // borramos los elementos anteriores
    elem.innerHTML = ''
    for (let letra of palabra) {
      let span = document.createElement('span')
      let txt = document.createTextNode('')
      if (adivinado.has(letra)) {
        txt.nodeValue = letra
      }
      span.setAttribute('class', 'letra adivinada')
      span.appendChild(txt)
      elem.appendChild(span)
    }
  
    // Creamos las letras erradas
    var errado = juego.errado
    elem = html.errado
    // Borramos los elementos anteriores
    elem.innerHTML = ''
    for (let letra of errado) {
      let span = document.createElement('span')
      let txt = document.createTextNode(letra)
      span.setAttribute('class', 'letra errada')
      span.appendChild(txt)
      elem.appendChild(span)
    }
  }
  
  function adivinar(juego, letra) {
    let estado = juego.estado
    // Si ya se ha perdido, o ganado, no hay que hacer nada
    if (estado === 1 || estado === 8) {
      return
    }
  
    let adivinado = juego.adivinado
    let errado = juego.errado
    // Si ya hemos adivinado o errado la letra, no hay que hacer nada
    if (adivinado.has(letra) || errado.has(letra)) {
      return
    }
  
  
  
    // palabra = juego.palabra
    let letras = juego.letras
    // Si es letra de la palbra
    if (letras.has(letra)) {
      // agregamos a la lista de letras adivinadas
      adivinado.add(letra)
      // actualizamos las letras restantes
      juego.restante--
  
      // Si ya se ha ganado, debemos indicarlo
      if (juego.restante === 0) {
        juego.previo = juego.estado
        juego.estado =  8
      }
    } else {
      // Si no es letra de la palabra, acercamos al hombre un paso más de su ahorca
      juego.estado--
      // Agregamos la letra, a la lista de letras erradas
      errado.add(letra)
    }
  }
  
  window.onkeypress = function adivinarLetra(e) {
    let letra = e.key
    letra = letra.toUpperCase()
    if (/[^A-ZÑ]/.test(letra)) {
      return
    }
    adivinar(juego, letra)
    let estado = juego.estado
    if (estado === 8 && !finalizado) {
      setTimeout(alertaGanado, 0)
      finalizado = true
    }else if (estado === 1 && !finalizado) {
      let palabra = juego.palabra
      let fn = alertaPerdido.bind(undefined, palabra)
      setTimeout(fn, 0)
      finalizado = true
    }
    dibujar(juego)
  }
  
  window.nuevoJuego = function nuevoJuego() {
    let palabra = palabraAleatoria()
    juego = {}
    juego.palabra = palabra
    juego.estado = 7
    juego.adivinado = new Set()
    juego.errado = new Set()
    finalizado = false
  
    let letras = new Set()
    for (let letra of palabra) {
      letras.add(letra)
    }
    juego.letras = letras
    juego.restante = letras.size
  
    dibujar(juego)
    console.log(juego)
  }
  
  
  function palabraAleatoria() {
    let index = ~~(Math.random() * palabras.length)
    return palabras[index]
  }
  
  function alertaGanado() {
    alert('Felicidades, ganaste!')
    jugarDeNuevo();
  }
  
  function alertaPerdido(palabra) {
    alert('Lo siento, perdiste... la palabra era: ' + palabra)
    jugarDeNuevo();
  }

  function jugarDeNuevo(){
    setInterval("location.reload()",60000);
  }

  btnNuevo.addEventListener("click", function(){
    nuevoJuego();
  });

  btnSalir.addEventListener("click", function(){
    location.reload();
    
  });
  
  nuevoJuego()
  
  }())
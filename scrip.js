const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');

CargarEventlistListeners();

function CargarEventlistListeners() {

    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    procesarPedidoBtn.addEventListener('click', procesarPedido);

}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${elemento.imagen}" width=100 >
      </td>
      <td>
        ${elemento.titulo}
      </td>
      <td>
        ${elemento.precio}
      </td>
      <td>
        <a href="#" class="borrar" data-id="${elemento.id}">X </a>
      </td>
    `;
  
    lista.appendChild(row);
  }
  

function eliminarElemento(e) {
    e.preventDefault();
    let elemento,
        elementoId;
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    return false;
}


// Función para generar la URL de WhatsApp
function generarURLWhatsApp(numeroTelefono, mensaje) {
  // Reemplazar caracteres especiales en el mensaje
  mensaje = mensaje.replace(/ /g, "%20");
  mensaje = mensaje.replace(/%/g, "%25");

  // Generar la URL
  const url = `https://wa.me/${numeroTelefono}?text=${mensaje}`;

  return url;
}

// Función procesar pedido
function procesarPedido() {
  // mostramos un mensaje de confirmación
  alert("Tu pedido ha sido procesado");
  const numero = 3327279981;
  const mensaje = "Hola, me gustaría hacer un pedido";
  const url = generarURLWhatsApp(numero, mensaje);
  window.open(url);
  
}
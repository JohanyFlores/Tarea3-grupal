document.getElementById('formUniverso').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  // Validar que nombre solo contenga letras y espacios
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
    alert('El nombre solo debe contener letras y espacios.');
    return;
  }
  const numeroMagico = parseInt(document.getElementById('numeroMagico').value);
  // Validar que numeroMagico sea un entero positivo
  if (!/^\d+$/.test(numeroMagico)) {
    alert('El número mágico debe ser un número entero positivo.');
    return;
  }
  const rasgo = document.getElementById('rasgo').value;
  const lugar = document.getElementById('lugar').value.trim();
  const tipoMundo = document.getElementById('tipoMundo').value;
  const transporte = document.getElementById('transporte').value;
  const fechaRegistro = document.getElementById('fechaRegistro').value; // Nuevo campo

  const nombreAlternativo = generarNombreAlternativo(nombre, numeroMagico);
  const historia = generarHistoria(nombreAlternativo, rasgo, lugar, tipoMundo, transporte, fechaRegistro); // Pasar fecha

  renderizarTarjeta(nombreAlternativo, historia, tipoMundo);
  this.reset();
});

function generarNombreAlternativo(nombre, numero) {
  const prefijos = ['Xen', 'Ka', 'Neo', 'Alt', '@'];
  const sufijos = ['-99', '_XZ', '404', '_ALT', '∞'];
  const base = nombre.split('').reverse().join('');
  return `${prefijos[numero % prefijos.length]}${base}${sufijos[numero % sufijos.length]}`;
}

function generarHistoria(nombreAlt, rasgo, lugar, mundo, transporte, fechaRegistro) {
  const rasgos = {
    'Magia': 'posee una conexión ancestral con fuerzas ocultas que fluyen a través de los portales cósmicos',
    'Rebeldía': 'se opone a todo lo establecido, rompiendo barreras entre realidades con una sonrisa desafiante',
    'Lógica': 'analiza y reorganiza cada universo con precisión quirúrgica y cálculos mentales avanzados',
    'Empatía': 'es capaz de comprender los corazones de criaturas que ni siquiera tienen forma física'
  };

  const fechaNarrativa = fechaRegistro ? ` La huella temporal de este periplo quedó grabada indeleblemente el ${formatearFecha(fechaRegistro)}, un punto de convergencia que los cartógrafos astrales consultan para futuras travesías.` : '';

  const escenarios = {
    'Selva flotante': `En el corazón de la Selva Flotante, donde los árboles flotan en el aire y las raíces se enredan con las nubes, ${nombreAlt} ${rasgos[rasgo]}
con una misión sagrada: encontrar el Lago de los Ecos Perdidos escondido en ${lugar}. Armado con un ${transporte}, su travesía incluye criaturas invisibles, puentes hechos de luz líquida y desafíos que alteran la memoria.${fechaNarrativa}`,

    'Ciudad de cristal': `Entre torres transparentes que reflejan pensamientos y calles que cambian de forma con las emociones, ${nombreAlt} ${rasgos[rasgo]}.
Su objetivo: llegar al Núcleo de la Lógica Viva, en el sector secreto de ${lugar}. Solo con la ayuda de su ${transporte} podrá navegar entre espejismos y realidades fracturadas.${fechaNarrativa}`,

    'Volcán parlante': `Cada erupción del Volcán Parlante no lanza lava, sino palabras antiguas y frases que alteran el destino. En ese caos, ${nombreAlt} ${rasgos[rasgo]}.
Debe descifrar el Lenguaje de Fuego para abrir las puertas de ${lugar}, viajando con su fiel ${transporte} entre las grietas del tiempo.${fechaNarrativa}`,

    'Cielo invertido': `En un universo donde el cielo es tierra y las montañas cuelgan hacia abajo, ${nombreAlt} ${rasgos[rasgo]}.
El aire canta y el suelo flota. Su viaje hacia ${lugar} le obligará a superar laberintos suspendidos y tormentas que llueven hacia arriba, todo mientras guía su ${transporte} con intuición pura.${fechaNarrativa}`
  };

  return escenarios[mundo];
}

function formatearFecha(fechaISO) {
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString('es-ES', opciones);
}

function renderizarTarjeta(nombre, historia, tipoMundo) {
  const contenedor = document.getElementById('resultado');
  contenedor.innerHTML = ''; // Borrar tarjetas anteriores

  const imagenesMundos = {
    'Selva flotante': './assets/img/selva_flotante.jpg',
    'Ciudad de cristal': './assets/img/ciudad_cristal.jpg',
    'Volcán parlante': './assets/img/volcan_parlante.jpg',
    'Cielo invertido': './assets/img/cielo_invertido.jpg'
  };

  const tarjeta = document.createElement('div');
  tarjeta.className = 'col-md-8';
  tarjeta.innerHTML = `
    <div class="card h-100 shadow-lg bg-light text-dark border-0">
      <img src="${imagenesMundos[tipoMundo]}" class="card-img-top" alt="${tipoMundo}" style="height: 250px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title text-primary">${nombre}</h5>
        <p class="card-text">${historia}</p>
      </div>
    </div>
  `;

  contenedor.appendChild(tarjeta);
}

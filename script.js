document.addEventListener('DOMContentLoaded', () => {
    verificarSesion();
    cargarEntregas();
});

function iniciarSesion(rol) {
    localStorage.setItem('usuarioRol', rol);
    window.location.href = 'Menu.html';
}

function verificarSesion() {
    const rolGuardado = localStorage.getItem('usuarioRol');
    const textoNav = document.getElementById('texto-nav-usuario');
    const btnUsuarios = document.getElementById('btn-usuarios');

    if (rolGuardado && textoNav) {
        textoNav.textContent = `Rol: ${rolGuardado}`;
    }
    if (btnUsuarios && rolGuardado === 'Operador') {
        btnUsuarios.style.display = 'inline';
    }
}

function servicios() {
    window.location.href = 'Servicios.html';
}

function confirmarEnvio() {

    let envio = document.getElementById("tipoEnvio").value;
    let contenido = document.getElementById("contenido").value;

    if (envio == "" || contenido == "") {
        alert("Debe seleccionar el tipo de envío y el contenido.");
        return;
    }

    let precio = 0;

    if (envio == "Normal") {
        precio = 10000;
    }
    else if (envio == "Rápido") {
        precio = 20000;
    }
    else if (envio == "Emergencia") {
        precio = 35000;
    }

    if (contenido == "Frágil") {
        precio = precio + 5000;
    }

    let solicitud = {
        envio: envio,
        contenido: contenido,
        precio: precio,
        fecha: new Date().toLocaleString()
    };

    localStorage.setItem("solicitudActual", JSON.stringify(solicitud));

    let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];

    solicitudes.push(solicitud);

    localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

    window.location.href = "Mapa.html";
}

function verificarConfirmacionMapa() {
    let destino = document.getElementById('nombre-destino').innerText;
    let contenido = localStorage.getItem('tipoContenido') || "frágil";
    return confirm("El envío es " + contenido.toLowerCase() + " e irá a " + destino + ". ¿Confirmar envío?");
}

function accion(boton, textoEstado, color) {
    let tarjeta = boton.parentElement;
    let nombre = tarjeta.querySelector('.nombre').innerText;

    tarjeta.querySelector('.estado').innerText = textoEstado;
    tarjeta.querySelector('.estado').style.color = color;
    boton.disabled = true;

    let guardados = JSON.parse(localStorage.getItem('entregas')) || {};
    guardados[nombre] = { texto: textoEstado, color: color };
    localStorage.setItem('entregas', JSON.stringify(guardados));
}

function cargarEntregas() {
    let guardados = JSON.parse(localStorage.getItem('entregas')) || {};
    let tarjetas = document.querySelectorAll('.usuario');

    for (let i = 0; i < tarjetas.length; i++) {
        let nombre = tarjetas[i].querySelector('.nombre').innerText;
        if (guardados[nombre]) {
            tarjetas[i].querySelector('.estado').innerText = guardados[nombre].texto;
            tarjetas[i].querySelector('.estado').style.color = guardados[nombre].color;
            tarjetas[i].querySelector('button').disabled = true;
        }
    }
}

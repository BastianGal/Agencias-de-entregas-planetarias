
// verifica si hay un rol guardado en la memoria del navegador y actualiza el texto del nav y el titulo del menu
document.addEventListener('DOMContentLoaded', () => {
    verificarSesion();
});
// va a a guardar el rol del usuario en la memoria del navegador y redirigir a menu.html
function iniciarSesion(rol) {
    // 1. Guardamos el rol en la memoria del navegador
    localStorage.setItem('usuarioRol', rol);

    // 2. Redirigimos a la página menu.html
    window.location.href = 'menu.html';
}
// va a verificar si hay un rol guardado en la memoria del navegador y actualizar el texto del nav y el titulo del menu
function verificarSesion() {
    const rolGuardado = localStorage.getItem('usuarioRol');
    const textoNav = document.getElementById('texto-nav-usuario');
    const tituloMenu = document.getElementById('titulo-menu');

    if (rolGuardado && textoNav) {
        textoNav.textContent = `Rol: ${rolGuardado}`;
    }
    if (rolGuardado && tituloMenu) {
        tituloMenu.textContent = `Menú (${rolGuardado})`;
    }
}
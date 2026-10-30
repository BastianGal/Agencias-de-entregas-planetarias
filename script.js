function iniciarSesion(rol) {
    // 1. Guardamos el rol en la memoria del navegador
    localStorage.setItem('usuarioRol', rol);

    // 2. Redirigimos a la página menu.html
    window.location.href = 'menu.html';
}
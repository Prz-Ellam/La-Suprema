export default function navbarSession() {
$.ajax({
    method: "GET",
    async: false,
    dataType: "json",
    url: '../Controllers/VerifySession.php'
}).done(function(data) {

    if (data.success) {
        const html = `
        <li class="nav-item">
            <a href="Profile.html" class="primary-nav-item nav-link text-white font-weight-bold">
                <i class="fas fa-solid fa-user mr-2"></i>Perfil
            </a>
        </li>
        <li class="nav-item">
            <a href="ShoppingCart.html" class="primary-nav-item nav-link text-white font-weight-bold">
                <i class="fas fa-shopping-cart mr-1"></i>Carrito
            </a>
        </li>
        <li class="nav-item">
            <a href="../Controllers/CloseSession.php" class="primary-nav-item nav-link text-white font-weight-bold">
                <i class="fas fa-door-open mr-2"></i>Salir
            </a>
        </li> 
        `;

        $('#orange-navbar').prepend(html);
    }
    else {
        const html = `
            <li class="nav-item">
                <a href="Registration.html" class="primary-nav-item nav-link text-white font-weight-bold">
                    <i class="fa fa-sign-in mr-2"></i>Registrarse
                </a>
            </li>
            <li class="nav-item">
                <a href="Login.html" class="primary-nav-item nav-link text-white font-weight-bold">
                    <i class="fas fa-solid fa-user mr-2"></i>Iniciar sesión
                </a>
            </li>
            <li class="nav-item">
                <a href="ShoppingCart.html" class="primary-nav-item nav-link text-white font-weight-bold">
                    <i class="fas fa-shopping-cart mr-1"></i>Carrito
                </a>
            </li>
        `;

        $('#orange-navbar').prepend(html);
    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});
}
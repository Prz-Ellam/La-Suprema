$.ajax({
    method: "GET",
    async: false,
    dataType: "json",
    url: '../Controllers/GetCategoriesController.php'
}).done(function(data) {

    let categories = data.categories;

    for (let i = 0; i < categories.length; i++) {

        const html = `
        <div class="item">
            <div class="text-center car-prueba p-4 m-4 rounded">
                <a href="#"><img src="Assets/Images/${categories[i].image}" class="p-3"></a>
                <p class="h4 brown">${categories[i].name}</p>
            </div>
        </div>
        `;

        $('#categories-carousel').append(html);
        
    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});






$.ajax({
    method: "GET",
    async: false,
    dataType: "json",
    url: '../Controllers/VerifySession.php'
}).done(function(data) {

    if (data.success) {
        const html = `
        <li class="nav-item ml-2">
            <a href="Profile.html" class="primary-nav-item nav-link text-white font-weight-bold">
                <i class="fas fa-solid fa-user mr-2"></i>Perfil
            </a>
        </li>
        <li class="nav-item ml-2">
            <a href="../Controllers/CloseSession.php" class="primary-nav-item nav-link text-white font-weight-bold">
                <i class="fas fa-door-open mr-2"></i>Salir
            </a>
        </li> 
        `;

        $('#orange-navbar').prepend(html);
    }
    else {
        const html = `
            <li class="nav-item ml-2">
                <a href="Registration.html" class="primary-nav-item nav-link text-white font-weight-bold">
                    <i class="fa fa-sign-in mr-2"></i>Registrarse
                </a>
            </li>
            <li class="nav-item ml-2">
                <a href="Login.html" class="primary-nav-item nav-link text-white font-weight-bold">
                    <i class="fas fa-solid fa-user mr-2"></i>Iniciar sesión
                </a>
            </li>
        `;

        $('#orange-navbar').prepend(html);
    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});



$.ajax({
    method: "GET",
    async: false,
    dataType: "json",
    url: '../Controllers/GetProductsController.php'
}).done(function(data) {

    let sellers = data.sellers;

    for (let i = 0; i < sellers.length; i++) {

        const html = `
        <div class="item">
            <div class="text-center car-prueba p-4 m-4 rounded">
                <a href="Product.html"><img src="Assets/Images/${sellers[i].image}" class="p-3"></a>
                <p class="font-weight-bold price mb-0">$${sellers[i].price}</p>
                <p class="mb-3">${sellers[i].name}</p>
                <button class="btn btn-primary shadow-none btn-cart">Agregar al carrito</button>
            </div>
        </div>
        `;

        $('#sellers').append(html);

    }


    let recents = data.recents;

    for (let i = 0; i < recents.length; i++) {

        const html = `
        <div class="item">
            <div class="text-center car-prueba p-4 m-4 rounded">
                <a href="Product.html"><img src="Assets/Images/${recents[i].image}" class="p-3"></a>
                <p class="font-weight-bold price mb-0">$${recents[i].price}</p>
                <p class="mb-3">${recents[i].name}</p>
                <button class="btn btn-primary shadow-none btn-cart">Agregar al carrito</button>
            </div>
        </div>
        `;

        $('#recents').append(html);

    }


    let recomendations = data.recomendations;
    if (recomendations.length !== 0) {
        $('#container-recomendations').removeClass('d-none');
    }

    for (let i = 0; i < recomendations.length; i++) {

        const html = `
        <div class="item">
            <div class="text-center car-prueba p-4 m-4 rounded">
                <a href="#"><img src="Assets/Images/${recomendations[i].image}" class="p-3"></a>
                <p class="font-weight-bold price mb-0">$${recomendations[i].price}</p>
                <p class="mb-3">${recomendations[i].name}</p>
                <button class="btn btn-primary shadow-none btn-cart">Agregar al carrito</button>
            </div>
        </div>
        `;

        $('#recomendations').append(html);

    }


}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});



$(document).ready(function() {

    let headerHeight = $('header').height();
    $('body').css('padding-top', parseFloat( headerHeight - 5 ));

    $('.banner').owlCarousel({
        loop: true,
        margin: 0,
        dots: true,
        autoplay: true,
        autoplayTimeout: 10000,
        animateOut: 'fadeOut',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    $('.sellers').owlCarousel({
        loop: true,
        margin: 10,
        dots: true,
        autoplay: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: true, // Es molesto ver un producto y que el carousel se mueva
        responsive: {
            0: {
                items: 1,
                margin: 0
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 4
            },
            1400: {
                items: 5
            }
        }
    });


    $('#search-box').submit(function(e) {

        e.preventDefault();

        $.ajax({
            data: $(this).serialize(),
            method: "GET",
           // dataType: "json",
            url: '../Controllers/SearchBox.php'
        }).done(function(data) {
        
            alert(data);
        
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });
        

    })

    $('.start-shop').on('click', function() {

        window.location.href = "Collections.html";

    });







});
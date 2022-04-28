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



$.ajax({
    data: window.location.search.substring(1),
    method: "GET",
    async: false,
    dataType: "json",
    url: '../Controllers/GetProductController.php'
}).done(function(data) {

    if (data.status) {

        $("#name").html(data.product.productName);
        $("#category").html(" " + data.product.categoryName);

        $("#price").html(Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(parseFloat(data.product.price)) + " M.N.");
        $("#zoom").attr("src", `Assets/Images/${data.product.image}`);

    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});





$(document).ready(function() {

    let headerHeight = $('header').height();
    $('body').css('padding-top', parseFloat( headerHeight - 5 ));

    $('.sellers').owlCarousel({
        loop: true,
        margin: 10,
        dots: true,
        autoplay: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: true, // Es molesto ver un producto y que el carousel se mueva
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 3
            },
            1400: {
                items: 3
            },
            2000: {
                items: 6
            },
            3000: {
                items: 7
            },
            4000: {
                items: 8
            }
        }
    });

    $("#add-cart").click(function() {

        let params = new URLSearchParams(document.location.search);

        let dataForm = {"product" : params.get("product"), "quantity" : $("#quantity").val() };

        $.ajax({
            data: dataForm,
            method: "POST",
            dataType: "json",
            url: '../Controllers/ShoppingCart.php'
        }).done(function(data) {
        
            alert(data.status);
        
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });
        

    });

    const stars = [$(".rating__star")];

$(".rating__star").click(function() {

    //let position = $(this).position();
    let starIndex = parseInt($(this)[0].id);

    for (let i = starIndex; i > 0; i--) {
        stars[0][i - 1].className = "rating__star fas fa-star";
    }
    for (let i = starIndex; i < 6; i++) {
        stars[0][i].className = "rating__star far fa-star";
    }


});


    $(".zoom").ezPlus({
        zoomType: 'inner',
        cursor: 'crosshair',
        zoomWindowFadeIn: 500,
        zoomWindowFadeOut: 500,
        lensFadeIn: 500,
        lensFadeOut: 500
    }/*{
        zoomType: "inner",
        zoomLevel: 2,
        cursor: "crosshair",
        zoomWindowFadeIn: 500,
		zoomWindowFadeOut: 500,
		lensFadeIn: 500,
		lensFadeOut: 500
    }*/);


})
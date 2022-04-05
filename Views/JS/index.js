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
                <a href="#"><img src="Assets/Images/${sellers[i].image}" class="p-3"></a>
                <p class="font-weight-bold price mb-0">$${sellers[i].price}</p>
                <p class="mb-3">${sellers[i].name}</p>
                <button class="btn btn-primary shadow-none btn-cart">Agregar al carrito</button>
            </div>
        </div>
        `;

        $('#sellers').append(html);

    }



    let recents = data.recents;

    for (let i = 0; i < sellers.length; i++) {

        const html = `
        <div class="item">
            <div class="text-center car-prueba p-4 m-4 rounded">
                <a href="#"><img src="Assets/Images/${recents[i].image}" class="p-3"></a>
                <p class="font-weight-bold price mb-0">$${recents[i].price}</p>
                <p class="mb-3">${recents[i].name}</p>
                <button class="btn btn-primary shadow-none btn-cart">Agregar al carrito</button>
            </div>
        </div>
        `;

        $('#recents').append(html);

    }





}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});



$(document).ready(function() {

    let headerHeight = $('header').height();
    $('body').css('padding-top', parseFloat( headerHeight - 5));

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

});
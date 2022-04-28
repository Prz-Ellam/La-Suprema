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
    method: "GET",
    async: false,
    dataType: "json",
    url: '../Controllers/GetShoppingCartItems.php'
}).done(function(data) {

    if (data.status) {


        $.each(data.items, function(i, e) {

            $("#shipping").append(`

            <div class="d-flex justify-content-between">
            <p>${e.productName}</p>
            <p>${e.price}</p>
            </div>
            `);


        })



        
    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

$(document).ready(function(){

    let headerHeight = $('header').height();
    $('body').css('padding-top', parseFloat( headerHeight - 5 ));

    $('#finish').on('click', function() {

        $.ajax({
            data: $("#msform").serialize(),
            method: "POST",
            dataType: "json",
            url: '../Controllers/Checkout.php'
        }).done(function(response) {

            console.log(response);



    
        }).fail(function(jqXHR, state, error) {
            console.log("Ups...algo salio mal: " + state);
        });

        Swal.fire({
            title: '¡Gracias por su compra!',
            text: '¡Que tenga un bonito día! ',
            icon: 'success',
            html:
            '<h4>¡Qué tenga un bonito día! <i class="fas fa-smile"></i><h4>',
            confirmButtonText : 'Ok',
            confirmButtonClassName: 'no-border',
            confirmButtonColor: '#FF5E1F',
            showCloseButton: true
        });

    });
    
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    
    $(".next").click(function(){
        
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        
        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        
        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
        step: function(now) {
            // for making fielset appear animation
            opacity = 1 - now;
            
            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });

            next_fs.css({'opacity': opacity});
        },
        duration: 600
    });

    window.scrollTo({ top: 0, behavior: 'smooth' })
    
});

$(".previous").click(function(){
    
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    //show the previous fieldset
    previous_fs.show();
    
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now) {
            // for making fielset appear animation
            opacity = 1 - now;
            
            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            
            previous_fs.css({'opacity': opacity});
        },
        duration: 600
    });

    window.scrollTo({ top: 0, behavior: 'smooth' })
});

$('.radio-group .radio').click(function(){
    $(this).parent().find('.radio').removeClass('selected');
    $(this).addClass('selected');
});

$(".submit").click(function(){
    return false;
});


});
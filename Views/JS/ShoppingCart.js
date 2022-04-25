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

        let items = data.items;

        for (let i = 0; i < items.length; i++) {

            $("tbody").append(`
                <tr id="${items[i].productId}">
                    <td style="width: 30%;" class="bg-white"><img src="Assets/Images/${items[i].image}" class="mr-3" height="100">${items[i].productName}</td>
                    <td class="bg-white align-middle">$<span class="price">${parseFloat(items[i].price) - (parseFloat(items[i].price) * parseFloat(items[i].discount))}</span></td>
                    <td class="bg-white align-middle"><input type="number" value="${items[i].quantity}" min="1" max="100" class="form-control shadow-none w-50 quantity"></td>
                    <td class="bg-white align-middle">$<span class="total">${(parseFloat(items[i].price) - (parseFloat(items[i].price) * parseFloat(items[i].discount))) * parseFloat(items[i].quantity)}</span> M.N</td>
                    <td class="bg-white align-middle"><span class="delete-item"><i class="fas fa-trash text-danger h3"></i></span></td>
                </tr>
            `);


        }

        let totalPrice = 0.0, quantity = 0;
        $('.total').each(function() {
            totalPrice += parseFloat($(this).html());
        });

        $('.quantity').each(function() {
            quantity += parseInt($(this).val());
        });

        $("tbody").append(`
        <tr>
        <td class="bg-white"></td>
        <td class="bg-white"></td>
        <td class="bg-white align-middle"><span id="final-quantity">${quantity}</span></td>
        <td class="bg-white align-middle">$<span id="final-price">${totalPrice}</span> M.N</td>
        <td class="bg-white align-middle"></td>
        </tr>   
        `);

        
    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});







$(document).ready(function() {

    let headerHeight = $('header').height();
    $('body').css('padding-top', parseFloat( headerHeight ));

    $('#finish-order').on('click', function() {
        window.location.href = "Checkout.html";
    });


    $('.quantity').on("change", function() {

        let quantity = parseInt($('input[type="number"').val());
        if (quantity === 0 || isNaN(quantity)) {
            return;
        }

        let dataForm = {"product-id" : $(this).parent().parent()[0].id, "quantity" : $(this).val()};

        $.ajax({
            data: dataForm,
            method: "POST",
            dataType: "json",
            url: '../Controllers/UpdateShoppingCartItems.php'
        }).done((data) => {

            let tr = $(this).parent().parent();
            let price = $(tr).find('td span.price');
            let total = $(tr).find('td span.total');
            
            total.html((parseInt($(this).val() * parseFloat(price.html()))).toFixed(2));
            
            let totalPrice = 0.0, quantity = 0;
            $('.total').each(function() {
                totalPrice += parseFloat($(this).html());
            });

            $('.quantity').each(function() {
                quantity += parseInt($(this).val());
            });
            
            $('#final-price').html(totalPrice);
            $("#final-quantity").html(quantity);
        
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });



    })

    $(".delete-item").click(function() {

        let tr = $(this).parent().parent();

        let dataForm = {"product-id" : tr[0].id};

        $.ajax({
            data: dataForm,
            method: "POST",
            dataType: "json",
            url: '../Controllers/DeleteShoppingCartItems.php'
        }).done(function(data) {

            $(tr).empty();
        
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });



    })





});
$(document).ready(function() {
    let headerHeight = $('header').height();
    $('body').css('padding-top', parseFloat( headerHeight ));


    $('.quantity').on('change', function() {


        let tr = $(this).parent().parent();
        let price = $(tr).find('td span.price');
        let total = $(tr).find('td span.total');

        total.html((parseInt($(this).val() * parseFloat(price.html()))).toFixed(2));

        let totalPrice = 0.0;
        $('.total').each(function() {

            totalPrice += parseFloat($(this).html());

        })


        $('#final-price').html(totalPrice);

    })

    $('#finish-order').on('click', function() {
        window.location.href = "Shippings.html";
    })





});
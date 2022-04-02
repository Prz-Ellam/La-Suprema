$(document).ready(function() {

    let headerHeight = $('header').height();
    $('body').css('padding-top', parseFloat( headerHeight - 5));

    $('#name').focus(function() {
        $('#name').removeClass('is-invalid').removeClass('is-valid');
        $("#name-error-label").remove();
    });

    $('#name').blur(function() {
        let validator = $("#signup-form").validate();
        if (validator.element("#name") === false) {
            $('#name').addClass('is-invalid').removeClass('is-valid');
        }
        else {
            $('#name').addClass('is-valid').removeClass('is-invalid');
        }
    });

    $('#email').focus(function() {
        $('#email').removeClass('is-invalid').removeClass('is-valid');
        $("#email-error-label").remove();
    });

    $('#email').blur(function() {
        let validator = $("#signup-form").validate();
        if (validator.element("#email") === false) {
            $('#email').addClass('is-invalid').removeClass('is-valid');
        }
        else {
            $('#email').addClass('is-valid').removeClass('is-invalid');
        }
    });

    $('#signup-form').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            },
            confirmpassword: {
                required: true
            }
        },
        messages: {
            name: {
                required: 'El nombre no puede estar vacío.'
            },
            email: {
                required: 'El correo electrónico no puede estar vacío',
                email: 'El correo electrónico que ingresó no es válido.'
            },
            password: {
                required: 'La contraseña no puede estar vacía.'
            },
            confirmpassword: {
                required: 'La contraseña no puede estar vacía.'
            }
        },
        errorElement: 'small',
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent()).addClass('text-danger').addClass('form-text').attr('id', element[0].id + '-error-label');
        }
    });

    $('#signup-form').submit(function(e) {

        e.preventDefault();

        if($('#signup-form').valid() === false) {
            return;
        }

        $.ajax({
            data: $(this).serialize(),
            method: "POST",
            dataType: "json",
            url: '../Controllers/RegistrationController.php'
        }).done(function(data) {
            if (data.success) {
                window.location.href = "index.html";
            }
            else {
                alert('No se pudo registrar');
            }
        }).fail(function(jqXHR, state) {
            alert("Ups...algo salio mal: " + state);
        });

    });

});
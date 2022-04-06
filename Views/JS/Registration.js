$(document).ready(function() {

    let headerHeight = $('header').height();
    $('body').css('padding-top', parseFloat( headerHeight - 5));



    // Validaciones en tiempo real
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

    $('#password').focus(function() {
        $('#password').removeClass('is-invalid').removeClass('is-valid');
        $("#password-error-label").remove();
    });

    $('#password').blur(function() {
        let validator = $("#signup-form").validate();
        if (validator.element("#password") === false) {
            $('#password').addClass('is-invalid').removeClass('is-valid');
        }
        else {
            $('#password').addClass('is-valid').removeClass('is-invalid');
        }
    });

    $('#confirmpassword').focus(function() {
        $('#confirmpassword').removeClass('is-invalid').removeClass('is-valid');
        $("#confirmpassword-error-label").remove();
    });

    $('#confirmpassword').blur(function() {
        let validator = $("#signup-form").validate();
        if (validator.element("#confirmpassword") === false) {
            $('#confirmpassword').addClass('is-invalid').removeClass('is-valid');
        }
        else {
            $('#confirmpassword').addClass('is-valid').removeClass('is-invalid');
        }
    });



    // Reglas de validaciones
    $.validator.addMethod('vUsername', function(value, element, parameter) {
        return this.optional(element) || /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/.test(value);
    }, 'invalido');

    $.validator.addMethod('realEmail', function(value, element, parameter) {
        return this.optional(element) || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }, 'invalido');

    $.validator.addMethod('confirmPass', function(value, element, parameter) {
        return this.optional(element) || $('#password').val() == value;
    }, 'invalido');

    $('#signup-form').validate({
        rules: {
            name: {
                required: true,
                vUsername: true
            },
            email: {
                required: true,
                email: true,
                realEmail: true
            },
            password: {
                required: true,
                minlength: 6
            },
            confirmpassword: {
                required: true,
                confirmPass: true
            }
        },
        messages: {
            name: {
                required: 'El nombre de usuario no puede estar vacío.',
                vUsername: 'El nombre de usuario no es válido'
            },
            email: {
                required: 'El correo electrónico no puede estar vacío',
                email: 'El correo electrónico que ingresó no es válido.',
                realEmail: 'El correo electrónico que ingresó no es válido.'
            },
            password: {
                required: 'La contraseña no puede estar vacía.',
                minlength: 'Por favor ingrese al menos 6 caracteres'
            },
            confirmpassword: {
                required: 'Confirmar contraseña no puede estar vacío.',
                confirmPass: 'Parece que la contraseña no coincide'
            }
        },
        errorElement: 'small',
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent()).addClass('text-danger').addClass('form-text').attr('id', element[0].id + '-error-label');
        }
    });



    // Submit
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

    $('#btn-facebook').on('click', function() {
        $.ajax({
            data: $(this).serialize(),
            method: "POST",
            dataType: "json",
            url: '../config.php'
        }).done(function(data) {
            if (data.success) {
                window.location.href = data.link;
            }
            else {
                console.log('Error con la API de Facebook');
            }
        }).fail(function(jqXHR, state) {
            alert("Ups...algo salio mal: " + state);
        });
    })



    // Caps Lock
    document.addEventListener("keyup", function(event) {
        if (event.getModifierState("CapsLock")) {
           $('#caps-lock').css('visibility', 'visible');
        } else {
            $('#caps-lock').css('visibility', 'hidden');
        }
    });

});
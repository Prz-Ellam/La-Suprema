$.ajax({
    method: "GET",
    async: false,
    dataType: "json",
    url: '../Controllers/VerifySession.php'
}).done(function(data) {

    if (data.success) {
        window.location.href = "index.html";
    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

$(document).ready(function() {

    // Validaciones en tiempo real
    $('#username').focus(function() {
        $('#username').removeClass('is-invalid').removeClass('is-valid');
        $("#username-error-label").remove();
    });

    $('#username').blur(function() {
        let validator = $("#signup-form").validate();
        if (validator.element("#username") === false) {
            $('#username').addClass('is-invalid').removeClass('is-valid');
        }
        else {
            $('#username').addClass('is-valid').removeClass('is-invalid');
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

    $('#show-password').click(function() {
        $('#password').attr('type', 'text');
        $('#show-password').css('visibility', 'hidden');
        $('#hide-password').css('visibility', 'visible');
        $('#password').focus();
    });

    $('#hide-password').click(function() {
        $('#password').attr('type', 'password');
        $('#show-password').css('visibility', 'visible');
        $('#hide-password').css('visibility', 'hidden');
        $('#password').focus();
    });

    $('#show-confirmpassword').click(function() {
        $('#confirmpassword').attr('type', 'text');
        $('#show-confirmpassword').css('visibility', 'hidden');
        $('#hide-confirmpassword').css('visibility', 'visible');
        $('#confirmpassword').focus();
    });

    $('#hide-confirmpassword').click(function() {
        $('#confirmpassword').attr('type', 'password');
        $('#show-confirmpassword').css('visibility', 'visible');
        $('#hide-confirmpassword').css('visibility', 'hidden');
        $('#confirmpassword').focus();
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
    
    $.validator.addMethod('validateEmail', function(value, element, parameter) {

        let result;
        $.ajax({
            async: false,
            data: {"email": $("#email").val()},
            method: "POST",
            dataType: "json",
            url: '../Controllers/ValidateEmail.php'
        }).done(function(data) {
            result = !data.result;
        }).fail(function(jqXHR, state) {
            alert("Ups...algo salio mal: " + state);
        });

        return this.optional(element) || result;
    }, 'invalido');

    $.validator.addMethod('validateUsername', function(value, element, parameter) {

        let result;
        $.ajax({
            async: false,
            data: {"username": $("#username").val()},
            method: "POST",
            dataType: "json",
            url: '../Controllers/ValidateUsername.php'
        }).done(function(data) {
            result = !data.result;
        }).fail(function(jqXHR, state) {
            alert("Ups...algo salio mal: " + state);
        });

        return this.optional(element) || result;
    }, 'invalido');

    $('#signup-form').validate({
        rules: {
            username: {
                required: true,
                vUsername: true,
                validateUsername: true
            },
            email: {
                required: true,
                email: true,
                realEmail: true,
                validateEmail: true
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
            username: {
                required: 'El nombre de usuario no puede estar vacío.',
                vUsername: 'El nombre de usuario no es válido (Debe contener entre 5 a 20 caracteres que sean letras, números o guiones bajos',
                validateUsername: 'El nombre de usuario que ingresaste esta siendo utilizado por otra persona'
            },
            email: {
                required: 'El correo electrónico no puede estar vacío',
                email: 'El correo electrónico que ingresó no es válido.',
                realEmail: 'El correo electrónico que ingresó no es válido.',
                validateEmail: 'El correo electrónico que ingresó ya esta siendo utilizado. ¿Quieres <a href="Login.html"> iniciar sesión</a>?'
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
                console.log('No se pudo realizar el registro');
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
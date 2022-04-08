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

$.ajax({
    data: $(this).serialize(),
    async: false,
    method: "POST",
    dataType: "json",
    url: '../Controllers/GetCookies.php'
}).done(function(data) {
    if(data.cookies) {
        $('#email').val(data.email);
        $('#password').val(data.password);
        $('#remember').prop('checked', true);
    }
}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

$(document).ready(function() {

    $('#email').focus(function() {
        $('#email').removeClass('is-invalid').removeClass('is-valid');
        $("#email-error-label").remove();
    });

    $('#email').blur(function() {
        let validator = $("#login-form").validate();
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
        let validator = $("#login-form").validate();
        if (validator.element("#password") === false) {
            $('#password').addClass('is-invalid').removeClass('is-valid');
        }
        else {
            $('#password').addClass('is-valid').removeClass('is-invalid');
        }
    });

    $('#password').on('input', function() {
        if ($('#password').val() !== '') {
            $('#password').attr('type', 'password');
            $('#show-password').css('visibility', 'visible');
        }
        else {
            $('#show-password').css('visibility', 'hidden');
            $('#hide-password').css('visibility', 'hidden');
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

    $.validator.addMethod('realEmail', function(value, element, parameter) {
        return this.optional(element) || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }, 'invalido');

    $('#login-form').validate({
        rules: {
            email: {
                required: true,
                email: true,
                realEmail: true
            },
            password: {
                required: true,
            }
        },
        messages: {
            email: {
                required: 'El correo electrónico no puede estar vacío.',
                email: 'El correo electrónico que ingresó no es válido.',
                realEmail:  'El correo electrónico que ingresó no es válido.'
            },
            password: {
                required: 'La contraseña no puede estar vacía.'
            }
        },
        errorElement: 'small',
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent()).addClass('text-danger').addClass('form-text').attr('id', element[0].id + '-error-label');
        }
    });

    $('#login-form').submit(function(e) {

        e.preventDefault();

        if($('#login-form').valid() === false) {
            return;
        }

        $.ajax({
            data: $(this).serialize(),
            method: "POST",
            dataType: "json",
            url: '../Controllers/LoginController.php'
        }).done(function(data) {
            if(data.success) {
                window.location.href = "index.html";
            }
            else {
                $("#email-error-label").remove();
                $('#email').addClass('is-invalid').removeClass('is-valid');
                $('#email').parent().append('<small class="text-danger form-text" id="email-error-label">El correo o la contraseña que ingreso no son correctos, por favor revise sus credenciales</small>');
                $('#password').addClass('is-invalid').removeClass('is-valid');
            }
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });

    });

    document.addEventListener("keyup", function(event) {
        if (event.getModifierState("CapsLock")) {
           $('#caps-lock').css('visibility', 'visible');
        } else {
            $('#caps-lock').css('visibility', 'hidden');
        }
    });


});
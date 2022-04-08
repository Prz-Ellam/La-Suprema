$(document).ready(function() {

    $('#finish').on('click', function() {

        Swal.fire({
            title: '¡Gracias por su compra!',
            text: '¡Que tenga un bonito día! ',
            icon: 'success',
            html:
            '<h4>¡Que tenga un bonito día! <i class="fas fa-smile"></i><h4>',
            confirmButtonText : 'Ok',
            confirmButtonClassName: 'no-border',
            confirmButtonColor: '#FF5E1F',
            showCloseButton: true
        });

    });

});
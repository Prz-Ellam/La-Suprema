$(document).ready(function() {
    let headerHeight = $('header').height();
    $('body').css('padding-top', parseFloat( headerHeight ));
});
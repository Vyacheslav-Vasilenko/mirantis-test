$(document).ready(function () {
    var ww = $(window).width();
    $(document).mouseup(function (e){
        if(ww < 1241){
            var div = $(".navigation");
            if (!div.is(e.target) && div.has(e.target).length === 0 && !$('.menu-button').is(e.target)) {
                $('.header').removeClass('open-nav');
                $('.header .menu-button').removeClass('active');
            }
        }
    });

    $('.header').on('click', '.menu-button', function () {
        $(this).toggleClass('active');
        $('.header').toggleClass('open-nav');
    });

    //Sticky header
    var hh = $('.header').outerHeight();
    $(window).scroll(function(){
        if ($(window).scrollTop() >= hh) {
            $('.header').addClass('header--fixed');
        }
        else {
            $('.header').removeClass('header--fixed');
        }
    });

    //Animation effects
    AOS.init();

});
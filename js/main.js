$(document).ready(function(){ 

    /* Nav */
    $('.menu-toggle').click(function(e) {
        e.stopPropagation();
        $('html').toggleClass('is-menu-toggled-on');
    });    

    /* Space */
    particlesJS.load('space', '/js/particlesjs-config.json');            

    /* Rocket animation */
    function loop() {
        $('#rocket').css({right:0,top:0});
        var rightMove=Math.floor(Math.random()*161)-80;
        var topMove=Math.floor(Math.random()*161)-80;
        var time1 = Math.floor(Math.random()*4000)+1000;
        var time2 = Math.floor(Math.random()*4000)+1000;
        $('#rocket').animate ({
            right: rightMove,
            top: topMove,
        }, time1, 'swing', function() {
            $('#rocket').animate ({ 
                right: 0,
                top: 0,
            }, time2, 'swing', function() {
                loop();
            });
        });
    }
    loop(); 

    /* Intro */
    var rotate_words = $('.rotate-words');
    if(rotate_words.length) {
        
        var next_word_index = 0;
        
        if(Modernizr.csstransforms) {
        
            rotate_words.each(function(index, element) {
                $(element).find('span').eq(0).addClass('active');
                setInterval(function(){
                    next_word_index = $(element).find('.active').next().length ? $(element).find('.active').next().index() : 0;
                    $(element).find('.active').addClass('rotate-out').removeClass('rotate-in active');
                    $(element).find('span').eq(next_word_index).addClass('rotate-in active').removeClass('rotate-out');
                },3000);
            });

        }
        else {
            
            rotate_words.each(function(index, element) {
                $(element).find('span').eq(0).addClass('active').show();
                setInterval(function(){
                    next_word_index = $(element).find('.active').next().length ? $(element).find('.active').next().index() : 0;
                    $(element).find('.active').removeClass('active').slideUp(500);
                    $(element).find('span').eq(next_word_index).addClass('active').slideDown(500);
                },3000);
            });
        }
    }

    /* Smooth scroll */
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 500);
            }
        }
    });

    /* Converter */
    var price_local;
    $.getJSON( "https://api.coinmarketcap.com/v1/ticker/litedoge/?convert=" + local_currency, function( data ) {
        price_local = data && data[0] != undefined && data[0]['price_'+local_currency.toLowerCase()] != undefined ? data[0]['price_'+local_currency.toLowerCase()] : NaN;
        convert_to_ldoge()
    });

    $('#currency_local_symbol').html(local_currency);

    var convert_to_local = function() {
        $('#converter_local').val($('#converter_ldoge').val()*price_local);
    };

    var convert_to_ldoge = function() {
        $('#converter_ldoge').val(Math.round($('#converter_local').val()/price_local*100)/100);
    };

    $('#converter_ldoge').change(convert_to_local);
    $('#converter_local').change(convert_to_ldoge);

    $('#converter_ldoge').keyup(convert_to_local);
    $('#converter_local').keyup(convert_to_ldoge);

});
/*--------------------------------------------
 ---- Coder: Masud Chowdhury -----------------
 ---- Contact: maxbizbd@ymail.com ------------
 ---- Github: https://github.com/maxbizbd ----
 -------------------------------------------*/

/**** Global Objects for common uses ****/
// Main Objects
var msObject_ = {
    "DOMready" : function(){
        $("#pre_loader_mask").remove();
        // Init Slick Nav
        $('#main_menu').slicknav({
            'label': ''
            //'prependTo': '#mobilenav'
        });

        //Init Carousel
        $('.owl-carousel').owlCarousel({
            loop:true,
            margin:10,
            nav:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:5
                }
            }
        });
    },
    "winLoad" : function(){
        setTimeout(function() {
            // wow js animation init
            wow = new WOW(
                {
                    boxClass:     'ms-wow',   // default- wow
                    animateClass: 'animated', // default
                    offset:       0,          // default
                    mobile:       true,       // default
                    live:         true        // default
                }
            );
            wow.init();
        }, 100);

        $("#pre_loader_mask").addClass('loaded').fadeOut(3000, function() {
            $(this).remove();
        });
    },
    "eventBinder" : function(){
        // cacheing the document DOM inside variable
        var doc = jQuery(document);
        doc.on('click', '.ScrollToJS', function() {
            var go_to = $(this).attr('href') || $(this).data('href') || '#';
            if($(go_to).length > 0){$('html, body').animate({scrollTop:$(go_to).position().top}, 1500);}
            return false;
        });
    }
};

/**** Global Functions for common uses ****/
//debounce function when rezize windows
function debouncer( func , timeout ) {
    var timeoutID , timeout = timeout || 200;
    return function () {
        var scope = this , args = arguments;
        clearTimeout( timeoutID );
        timeoutID = setTimeout( function () {
            func.apply( scope , Array.prototype.slice.call( args ) );
        } , timeout );
    }
}


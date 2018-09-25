/*--------------------------------------------
 ---- Coder: Masud Chowdhury -----------------
 ---- Contact: maxbizbd@ymail.com ------------
 ---- Github: https://github.com/maxbizbd ----
 -------------------------------------------*/
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

/********** Document Ready Function ************/
$(document).ready(function(){

});

/********** Window load complete *************/
$(window).on('load', function(){

});

/************** Window resize ***************/
$(window).resize(debouncer(function(){

}));


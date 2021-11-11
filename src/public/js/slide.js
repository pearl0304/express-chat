$(function(){

    // feed img slide
    $('.post-slide').slick({
        dots:true,
        arrows:false
    });
    // article+commnet slide
    $('.articleview').slick({
        dots:true,
        arrows:false
    });

    $('ul.tabs-ico li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs-ico li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    })


})
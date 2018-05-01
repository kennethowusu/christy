$('#menu-icon').on('click',function(){
  $("html").toggleClass('show-menu');
})

$('.main-nav').on('click',function(e){
  var target = $(e.target);
  var targetId = target.attr("id");
  $('.sub-navs#'+targetId).show();
})

$('.sub-nav').on('click',function(e){
  var target = $(e.target);
  var targetId = target.attr("id");
  $('.sub-sub-navs#'+targetId).show();
})


$('.back-cont,.back').on('click',function(e){
  $(e.target).parents('.sub-navs').first().hide();
})

$('.sub-back-cont,.sub-back').on('click',function(e){
  $(e.target).parents('.sub-sub-navs').first().hide();
})

$('.main-nav').hover(function(e){
  var target = $(e.target);
  var targetId = target.attr("id");
  var navcont  = $('.nav-container#'+targetId);
  if(navcont.css("display")=="none"){
    navcont.addClass('force-flex');
  }else{
    navcont.removeClass('force-flex');
  }
},function(e){
  var target = $(e.target);
  var targetId = target.attr("id");
  var navcont  = $('.nav-container#'+targetId);
  if(navcont.css("display")=="none"){
    navcont.addClass('force-flex');
  }else{
    navcont.removeClass('force-flex');
  }
});

$('.nav-container').on("mouseenter",function(e){
  $(e.target).toggleClass("d-flex");
});








//=========================
//FOR SLICK
//=========================
$(".banner-container").slick({
  infinite: true,
   arrows: true,
   dots:true,
   autoplay:true,
   autoplayspeed:400
});


$(".products-section").slick({
  infinite: true,
   arrows: true,
   dots:true,
   slidesToShow:3
});


//=========================
//FOR NAV
//========================
function showNav(){
  $('#nav-overlay').animate({
  width:"100%",
  display:"block !important"
  },0);
  $('.nav-container').addClass('no-translate');
}


function hideNav(){
  $('#nav-overlay').animate({
  width:"0",
  display:"block !important"
  },0);
  $('.nav-container').removeClass('no-translate');
}

$('#nav-overlay').on('click',function(e){
  var clicked = $(e.target);
  if(clicked.is('.nav-container') || clicked.parents().is('.nav-container')){
    return;
  }else{
   hideNav();
 }
})

$('#menu-img,.menu').on('click',function(){
  showNav();
})

$('#close,.close').on('click',hideNav);

//for g-list products


//================
//STICKY NAV
//===============
 $(".main-header").sticky({topSpacing:0});
$('.banner-cont').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    dots:true
})

$('.g-list').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

//for xzoom
$(".xzoom, .xzoom-gallery").xzoom({});

//========================
//PRIMARY COLUMN
//========================

$('.head-toggler').on('click',function(e){
  var target  = $(e.target);

  $('.content-toggle#'+target.attr('id')).toggle();
  target.toggleClass('add-minimize');

})


//==========
//SORT AND FILTER//
//===========
$('#sort-filter').on('click',function(){
  $('.primary-column').show();
})

$('#done').on('click',function(){
  $('.primary-column').hide();
})

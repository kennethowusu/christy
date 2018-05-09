
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

//================
//STICKY NAV
//===============
 $(".main-header").sticky({topSpacing:0});
$('.banner-cont').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    dots:true
})


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

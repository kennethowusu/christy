$('#nav-overlay').on('click',function(e){
  var clicked = $(e.target);
  if(clicked.is('.nav-container') || clicked.parents().is('.nav-container')){
    return;
  }else{

      $('.nav-container').removeClass('no-translate');
      $("#nav-overlay").hide(300,'linear');
  }
})

$('#menu-img,.menu').on('click',function(){
  $('#nav-overlay').show(300,'linear');
  $('.nav-container').addClass('no-translate');
})

$('#close,.close').on('click',function(){
    $("#nav-overlay").hide(300,'linear');
    $('.nav-container').addClass('no-translate');
})

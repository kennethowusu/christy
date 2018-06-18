var product_id = $('#product_id').val();
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


$(window).on('scroll',function(e){
  var target = $(e.target);
  var header = $('.main-header');
  if(header.height() <= target.scrollTop()){
     header.addClass('is-sticky');
  }else{
    header.removeClass('is-sticky');
  }
})

$('window').on('scroll',function(){
  alert(scrollTop());
})




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


function showLoader(){
  $('.variant-loader').css('display','flex');
}
function hideLoader(){
  $('.variant-loader').hide();
}
//for variants
//ajax to search for some images
$('.swatcher').on('click',function(e){
  e.preventDefault();
  var variant_id = $(this).attr('href');
   showLoader();
  //created a new element
var section = $('.some-div');
  $.ajax({
    type:"post",
    url:"/variant?variant_id="+variant_id
  }).done(function(results){
    var variant  = results;
    //creating new xzoom html markup from searched images
    var images = '<img class="xzoom" id="main_image" '+  'src=https://s3.eu-west-2.amazonaws.com/glammycare/'+variant.images[0].image +' xoriginal=https://s3.eu-west-2.amazonaws.com/glammycare/'+variant.images[0].image+'><div class="xzoom-thumbs">';
    variant.images.forEach(function(variant_image){
      images+= "<a href=https://s3.eu-west-2.amazonaws.com/glammycare/"+variant_image.image+"><img class='xzoom-gallery' src=https://s3.eu-west-2.amazonaws.com/glammycare/"+variant_image.image+" xpreview=https://s3.eu-west-2.amazonaws.com/glammycare/"+variant_image.image+"></a>";
    })
     images+= '</div>';
     //appending the newly xzoom html markup to the created element
    var image_output = $(images);
    var main_elem = section.html(image_output);

    //replacing the  the existing the xzoom markup in the dom with the newly searched images(ajax images)
    $('.zoom-container').html(main_elem);
     main_elem.find('.xzoom,.xzoom-gallery').xzoom({});

    $('#color').html(variant.color);
    $('#image').val(variant.images[0].image)
    hideLoader();

  })

})

//add to basket
$('#to-basket').on('click',function(){
  var product_id = $('#product_id').val();
  var color  = $('#color').text();
  var price = $('#price').text();
  var quantity = $('#quant-select').val();
  var image = $('#image').val();
  var name = $('#name').text();
  var data = {
    name:name,
    product_id:product_id,
    color:color,
    price:price,
    quantity:quantity,
    image:image
  }
  $.ajax({
    type:"post",
    url:"/basket/add/to/basket",
    data:data
  }).done(function(results){
   addedItem(data);
  })
})

function addedItem(addedItem){
  $.ajax({
    type:"get",
    url:"/basket/get/basket/history"
  }).done(function(result){
   $('.basket-img').attr("src","https://s3.eu-west-2.amazonaws.com/glammycare/"+addedItem.image);
   $('.basket-quant').html(addedItem.quantity);
   $('.basket-color').html(addedItem.color);
   $('.total_amount').html(result.total);
   $('.quant_total').html(result.total_num_of_items + " items in total)");
   $('.quantity_total').html(result.total_quantity);
   $("#no-bag-items").html(result.total_num_of_items);
   $('.basket-modal').fadeIn(1000);
  })
}

//close modal
$('#modal-close,.hide-basket').on('click',function(){
  $('.basket-modal').fadeOut(1000);
})

$('.fav').on('click',addToFavourite);

function addToFavourite(){

  $.ajax({
    type:"post",
    url:"/favourites?product_id="+product_id
  }).done(function(result){
    console.log(result);
  })
}

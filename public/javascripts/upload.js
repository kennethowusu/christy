var about;
var how_to_use;
var product_id = $('#product_id').val();
var preview__btn =  $('.image-preview__btn');
var uploaded_photos = $('.uploaded-photos');
var swatch_id = $('#swatch_id').val();
var swatch_image = document.getElementById('swatch_image');
//REPLACE DEFAULT TEXT EDITORS
//image var
ClassicEditor
    .create( document.querySelector( '#about' ) )
    .then( editor => {
        about = editor;
    } )
    .catch( error => {
        console.error( error );
    } );



    ClassicEditor
      .create( document.querySelector( '#how_to_use' ) )
      .then( editor => {
          how_to_use = editor;
      } )
      .catch( error => {
          console.error( error );
      } );



      ClassicEditor
        .create( document.querySelector( '#ingredients' ) )
        .then( editor => {
            ingredients = editor;
        } )
        .catch( error => {
            console.error( error );
        } );



 //set description fields

$('div,p').on('focusout',function(e){
  if($(e.target).parents().is('#about_field')){
    $('.saving').show();
    var data = {data:about.getData()};
    $.ajax({
      type:'post',
      url:'/upload/new/description/about?product_id='+product_id,
      data:data
    }).done(function(result){
      showSaved();
      console.log('done');
    })

  }

})

//how_to_use

$('div,p').on('focusout',function(e){
 if($(e.target).parents().is('#how_to_use_field')){
   $('.saving').show();
   var data = {data:how_to_use.getData()};
   $.ajax({
     type:'post',
     url:'/upload/new/description/how_to_use?product_id='+product_id,
     data:data
   }).done(function(result){
     showSaved();
     console.log('done');
   })

 }

})


//ingredients

$('div,p').on('focusout',function(e){
 if($(e.target).parents().is('#ingredients_field')){
   $('.saving').show();
  var data = {data:ingredients.getData()};
   $.ajax({
     type:'post',
     url:'/upload/new/description/ingredients?product_id='+product_id,
     data:data
   }).done(function(result){
     showSaved();
     console.log('done');
   })

 }

})

var image =  document.getElementById('image');

image.onchange = function(){
  var formdata = new FormData();
  var files = image.files;
  var file = files[0];

  formdata.append('image',file);
  uploadImage(formdata,file.name);

}

//upload image
function uploadImage(formdata,filename){
  $('.loader-div').css('display','flex');
  var xhr = new XMLHttpRequest();
  xhr.open('post','/upload/new/description?filename='+filename);

  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      $('.loader-div').hide();
      var result = JSON.parse(xhr.responseText);
      $('.uploaded-photos').append(`<div class="image-preview"> <div class="image-preview__img"><img src="${result.location}" alt="" class="control"></div><div class="image-preview__action"><input class='image_key' type="hidden" value="${result.key}"><button  type="button" class="image-preview__btn"><img src="/images/delete.svg" alt="" class="image-preview__delete">Delete photo</button></div></div>`);
      addImageToProduct(product_id,result.key);
    }
  }
  xhr.send(formdata);
}

//add uploaded image to the product
function addImageToProduct(product_id,keyname){
  var data = {keyname:keyname,product_id:product_id};
  $.ajax({
    type:"post",
    url:('/upload/new/description/image?image_key='+keyname),
    data:data
  }).done(function(result){
    console.log('image added to product');
  })
}


$('.uploaded-photos .image-preview__btn').on('click',function(e){
   var image_key = $(e.target).parent('.image_key').attr('value');
   console.log('ok');
})


//FOR NOTIFICATIONS
function showSaved(){
  $('.saving').hide();
  $('.saved').show();
  if($('.saved').is(':visible')){
    $('.saved').fadeOut(4000);
  }
}

//FOR SWATCH

$('#swatch_color').on('focusout',function(e){
   $('.saving').show();
  var data =  $(e.target).val();
   $.ajax({
     type:'post',
     url:'/upload/new/swatch/description/swatch_color?color='+data+'&product_id='+product_id+'&swatch_id='+swatch_id,

   }).done(function(result){
     showSaved();
     console.log('done');
   })



})




swatch_image.onchange = function(){
  var formdata = new FormData();
  var files = swatch_image.files;
  var file = files[0];

  formdata.append('image',file);
  uploadImage(formdata,file.name);

}



//add uploaded image to the product
function addImageToSwatch(product_id,keyname){
  var data = {keyname:keyname,product_id:product_id};
  $.ajax({
    type:"post",
    url:('/upload/new/description/swatch/image?image_key='+keyname),
    data:data
  }).done(function(result){
    console.log('image added to product');
  })
}

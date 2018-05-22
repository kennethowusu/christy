var about;
var how_to_use;
var product_id = $('#product_id').val();
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


 $('#ingredients').on('blur',function(e){
   console.log($('#ingredients').text());
 })


 //set description fields

$('div,p').on('focusout',function(e){
  if($(e.target).parents().is('#about_field')){
    var data = {data:about.getData()};
    $.ajax({
      type:'post',
      url:'/upload/new/description/about?product_id='+product_id,
      data:data
    }).done(function(result){
      console.log('done');
    })

  }

})

//how_to_use

$('div,p').on('focusout',function(e){
 if($(e.target).parents().is('#how_to_use_field')){
   var data = {data:how_to_use.getData()};
   $.ajax({
     type:'post',
     url:'/upload/new/description/how_to_use?product_id='+product_id,
     data:data
   }).done(function(result){
     console.log('done');
   })

 }

})


//ingredients

$('#ingredients').on('focusout',function(e){
 if($(e.target).parents().is('#about_field')){
   var data = {data:$('#ingredients').val()};
   $.ajax({
     type:'post',
     url:'/upload/new/description/ingredients?product_id='+product_id,
     data:data
   }).done(function(result){
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


function uploadImage(formdata,filename){
  $('.loader-div').css('display','flex');
  var xhr = new XMLHttpRequest();
  xhr.open('post','/upload/new/description?filename='+filename);

  xhr.onreadystatechange = function(){
    if(xhr.readyState < 3){

    }

    if(xhr.readyState == 4 && xhr.status == 200){
      $('.loader-div').hide();
      var result = JSON.parse(xhr.responseText);
      console.log(result.location);
    }
  }
  xhr.send(formdata);
}



//image var


var image =  document.getElementById('image');


image.onchange = function(){
  var formdata = new FormData();
  var files = image.files;
  var file = files[0];

  formdata.append('image',file);
  uploadImage(formdata,file.name);

}


function uploadImage(formdata,filename){
  var xhr = new XMLHttpRequest();
  xhr.open('post','/upload/somethingtoupload?filename='+filename);

  xhr.onreadystatechange = function(){
    if(xhr.readyState < 3){
      console.log('uploading');
    }

    if(xhr.readyState == 4 && xhr.status == 200){
      var result = JSON.parse(xhr.responseText);
      console.log(result.location);
    }
  }
  xhr.send(formdata);
}

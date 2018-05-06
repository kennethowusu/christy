

var firstname = $('#firstname');
var lastname  = $('#lastname');
var email = $('#email');
var password = $('#password');
var error = [];

 var email_style = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//
// //show Password
// $("#toggle-show").on('click',function(e){
//  $(e.target).html("hide").removeAttr('id').attr('id',"toggle-hide");
// })
//
// $("#toggle-hide").on('click',function(e){
//   $(e.target).html("show").removeAttr("id").attr("id","toggle-show");
// });
//

function addError(errorName){
  if(error.includes(errorName)){
    return
  }else{
    error.push(errorName);
  }
}

firstname.focusout(function(){
  if(firstname.val().length>1){
    $('.firstname-label').show();
    $('.firstname-error').hide();
    firstname.removeClass('border-danger');
    error.splice(error.indexOf('firstname'),1);
  }else{
    $('.firstname-label').hide();
    $('.firstname-error').css("display","flex");
    firstname.addClass('border-danger');
     addError("firstname");
  }

})


lastname.focusout(function(){
  if(lastname.val().length>1){
    $('.lastname-label').show();
    $('.lastname-error').hide();
    lastname.removeClass('border-danger');
    error.splice(error.indexOf('lastname'),1);
  }else{
    $('.lastname-label').hide();
    $('.lastname-error').css("display","flex");
    lastname.addClass('border-danger');
    addError('lastname');
  }

})

email.focusout(function(){
  if(email_style.test(email.val())){
    $('.email-label').show();
    $('.email-error').hide();
    email.removeClass('border-danger');
    error.splice(error.indexOf('email'),1);

  }else{
    $('.email-label').hide();
    $('.email-error').css("display","flex");
    email.addClass('border-danger');
    addError('email');
  }

})

password.focusout(function(){
  if(password.val().length>=6){
    $('.password-label').show();
    $('.password-error').hide();
    password.removeClass('border-danger');
    error.splice(error.indexOf('password'),1);
  }else{
    $('.password-label').hide();
    $('.password-error').css("display","flex");
    password.addClass('border-danger');
      addError('password');
  }

})

$("#form-submit").on("click",function(e){

  if(error.length > 0 ){
    e.preventDefault();
    console.log(error.length);
    for(i=0;i<error.length;i++){
      $("#"+ error[i]+ "-label").hide();
      $("#"+ error[i]+ "-error").css("display","flex")
      $("#"+ error[i]).addClass('border-danger');
    }
    return;
  }else if( ($("#firstname").length && !$("#firstname").val())
            || ($("#lastname").length && !$('#lastname').val())
            || ($("#email").length && !$('#email').val())
            || ($("#password").length && !$("#password").val())){
    e.preventDefault();
  }else{
    return;
  }



})
$(document).on("click",function(){
  console.log(error);
})

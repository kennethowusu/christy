var email = $('#email');
var password = $('#password');
var email_style = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var error = [];
// var email = $('#email');
// var errors
// function checkIfEmpty(){
//   if(email===""){
//     error[email_error] = "Email must not be empty"
//   }
// }

function addError(errorName){
  if(error.includes(errorName)){
    return
  }else{
    error.push(errorName);
  }
}

email.change(function(){
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
  if(password.val().length>=1){
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

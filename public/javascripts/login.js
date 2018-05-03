

var firstname = $('#firstname');
var lastname  = $('#lastname');
var email = $('#email');
var password = $('#password');
var error;

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


firstname.focusout(function(){
  if(firstname.val().length>1){
    $('.firstname-label').show();
    $('.firstname-error').hide();
    firstname.removeClass('border-danger');
  }else{
    $('.firstname-label').hide();
    $('.firstname-error').css("display","flex");
    firstname.addClass('border-danger');
  }

})


lastname.focusout(function(){
  if(lastname.val().length>1){
    $('.lastname-label').show();
    $('.lastname-error').hide();
    lastname.removeClass('border-danger');
  }else{
    $('.lastname-label').hide();
    $('.lastname-error').css("display","flex");
    lastname.addClass('border-danger');
  }

})

email.focusout(function(){
  if(email_style.test(email.val())){
    $('.email-label').show();
    $('.email-error').hide();
    email.removeClass('border-danger');
  }else{
    $('.email-label').hide();
    $('.email-error').css("display","flex");
    email.addClass('border-danger');
  }

})

password.focusout(function(){
  if(password.val().length>6){
    $('.password-label').show();
    $('.password-error').hide();
    password.removeClass('border-danger');
  }else{
    $('.password-label').hide();
    $('.password-error').css("display","flex");
    password.addClass('border-danger');

  }

})

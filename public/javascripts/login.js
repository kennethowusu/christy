



//show Password
$("#toggle-show").on('click',function(e){
 $(e.target).html("hide").removeAttr('id').attr('id',"toggle-hide");
})

$("#toggle-hide").on('click',function(e){
  $(e.target).html("show").removeAttr("id").attr("id","toggle-show");
});

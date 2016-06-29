
/**
 * @description Warning delete
 * @method click btn_delete
 * @return true or false
 */
$(function(){
  $('.btn-delete').click(function(){
    var r = confirm('Are you sure that you want to delete this user?');
    if(r == false){
      return false;
    }
  })
});

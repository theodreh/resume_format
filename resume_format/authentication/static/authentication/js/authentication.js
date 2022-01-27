var email_val=false
function submit_sign_up_details(){
    var user_first_name=$('#user_first_name').val().trim();
    var user_last_name=$('#user_last_name').val().trim();
    var user_email=$('#email_id').val().trim();
    var user_password=$('#user_password').val().trim();
    var user_conf_password=$('#confirm_password').val().trim();
    var check_error=false
    var mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    blur_email_val()

    if(!user_first_name){
        $('#ft_name-error').text("Enter first name")
        $('#ft_name-error').addClass("is-visible");
        check_error=true
    }
    else{
         $('#ft_name-error').removeClass("is-visible");
    }
    if(!user_last_name){
        $('#ls_name-error').text("Enter last name")
        $('#ls_name-error').addClass("is-visible");
        check_error=true
    }
    else{
         $('#ls_name-error').removeClass("is-visible");
    }
    if(!user_email){
        $('#email-error').text("Enter the email address")
        $('#email-error').addClass("is-visible");
        check_error=true
    }
    else{
         if(!user_email.match(mail_format)){
            $('#email-error').text("Enter a valid email")
            $('#email-error').addClass("is-visible");
            check_error=true
        }
        else{
            console.log(email_val,"email_val")
            if(email_val==true){
                $('#email-error').text("Email address already exist")
                $('#email-error').addClass("is-visible");
                check_error=true
            }
            else{
                $('#email-error').removeClass("is-visible");
            }
        }
    }
    if(!user_password){
        $('#password-error').text("Enter the password")
        $('#password-error').addClass("is-visible");
        check_error=true
    }
    else{
         $('#password-error').removeClass("is-visible");
    }
    if(!user_conf_password){
        $('#confirm_password-error').text("Confirm your password")
        $('#confirm_password-error').addClass("is-visible");
        check_error=true
    }
    else{
         $('#confirm_password-error').removeClass("is-visible");
    }
    if(user_password!=user_conf_password){
        $('#confirm_password-error').text("Those passwords didn’t match. Try again.")
        $('#confirm_password-error').addClass("is-visible");
        check_error=true
    }
    else{
        if(user_password && user_conf_password){
            $('#confirm_password-error').removeClass("is-visible");
        }
    }
    if(check_error==true){
        return check_error
    }

    var csrf_val = $('[name=csrfmiddlewaretoken]').val();

    $.ajax({
        url:'signup',
        type:'POST',
        data:{"first_name":user_first_name,"last_name":user_last_name,"email":user_email,"password":user_password},
        headers: { "X-CSRFToken": csrf_val},
        success: function(result) {
            if(result.status==1){
                swal("Success!",result.message,"success",).then(function(){
                    window.location.href='/signin'
                });

            }
            else{
                swal({title: "Warning!",text: result.message,type: "warning",timer: 3000});
            }
	    },
    });

}

function submit_sign_in_details(){
    var user_email=$('#email_id').val().trim();
    var user_password=$('#user_password').val().trim();
    var check_error=false
    if(!user_email){
        $('#email-error').text("Enter user email address")
        $('#email-error').addClass("is-visible");
        check_error=true
    }
    else{
         $('#email-error').removeClass("is-visible");
    }
    if(!user_password){
        $('#password-error').text("Enter the user password")
        $('#password-error').addClass("is-visible");
        check_error=true
    }
    if(check_error==true){
        return check_error
    }
    var csrf_val = $('[name=csrfmiddlewaretoken]').val();

    $.ajax({
        url:'signin',
        type:'POST',
        data:{"email":user_email,"password":user_password},
        headers: { "X-CSRFToken": csrf_val},
        success: function(result) {
            if(result.status==1){
                swal({title: "Please wait!",text: result.message,type: "success",timer: 1000}).then(function(){
                    window.location.href='/user_details'
                });
            }
            else{
                swal("Warning!",result.message,"warning");
            }

	    },
    });

}

function save_user_details(){

    var user_id=$('#user_id').val();
    var user_first_name=$('#user_first_name').val().trim();
    var user_last_name=$('#user_last_name').val().trim();
    var user_email=$('#email_id').val().trim();
    var age=$('#age').val().trim();
    var dob=$('#date_of_birth').val().trim();
    var contact=$('#contact').val().trim();
    var check_error=false
    var mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    blur_email_val()

    if(!user_first_name){
        $('#ft_name-error').text("Enter first name")
        $('#ft_name-error').addClass("is-visible");
        check_error=true
    }
    else{
         $('#ft_name-error').removeClass("is-visible");
    }
    if(!user_last_name){
        $('#ls_name-error').text("Enter last name")
        $('#ls_name-error').addClass("is-visible");
        check_error=true
    }
    else{
         $('#ls_name-error').removeClass("is-visible");
    }
    if(!user_email){
        $('#email-error').text("Enter the email address")
        $('#email-error').addClass("is-visible");
        check_error=true
    }
    else{
        if(!user_email.match(mail_format)){
            $('#email-error').text("Enter a valid email")
            $('#email-error').addClass("is-visible");
            check_error=true
        }
        else{
            console.log(email_val,"email_val")
            if(email_val==true){
                $('#email-error').text("Email address already exist")
                $('#email-error').addClass("is-visible");
                check_error=true
            }
            else{
                $('#email-error').removeClass("is-visible");
            }
        }

    }
    console.log(check_error,"check_error")
    if(check_error==true){
        return check_error
    }

    var csrf_val = $('[name=csrfmiddlewaretoken]').val();

    $.ajax({
        url:'user_details',
        type:'POST',
        data:{"user_id":user_id,"first_name":user_first_name,"last_name":user_last_name,"email":user_email,"age":age,"dob":dob,"contact":contact},
        headers: { "X-CSRFToken": csrf_val},
        success: function(result) {
            swal("Success!",result.message,"success")
	    },
    });

}

function sign_out(event){
    var csrf_val = $('[name=csrfmiddlewaretoken]').val();
    $.ajax({
        url:'signout',
        type:'POST',
        data:{},
        headers: { "X-CSRFToken": csrf_val},
        success: function(result) {
            swal({title: "Please wait!",text: result.message,timer: 1000}).then(function(){
                    window.location.href='/signin'
                });
	    },
    });
}

function blur_email_val(){
    var csrf_val = $('[name=csrfmiddlewaretoken]').val();
    var user_email=$('#email_id').val().trim();
    var user_id=$('#user_id').val();

    $.ajax({
        url:'validate_email',
        type:'POST',
        data:{'user_id':user_id,'user_email':user_email},
        headers: { "X-CSRFToken": csrf_val},
        success: function(result) {
            if(result.status==0){
                email_val=true
                swal("Warning!",result.message,"warning")
            }
            else{
                email_val=false
            }
            return email_val


	    },
    });
  };

$(".password_eye_btn").click(function(){
      var user_password = document.getElementById("user_password");
      var show_eye = document.getElementById("show_eye");
      var hide_eye = document.getElementById("hide_eye");
      hide_eye.classList.remove("d-none");
      if (user_password.type === "password") {
        user_password.type = "text";
        $('#show_eye').hide();
        $('#hide_eye').show();
      } else {
        user_password.type = "password";
        $('#show_eye').show();
        $('#hide_eye').hide();
      }
});

$(".conf_password_eye_btn").click(function(){
      var user_password = document.getElementById("confirm_password");
      var show_eye = document.getElementById("conf_show_eye");
      var hide_eye = document.getElementById("conf_hide_eye");
      hide_eye.classList.remove("d-none");
      if (user_password.type === "password") {
        user_password.type = "text";
        $('#conf_show_eye').hide();
        $('#conf_hide_eye').show();
      } else {
        user_password.type = "password";
        $('#conf_show_eye').show();
        $('#conf_hide_eye').hide();
      }
});

function onlyNumberKey(evt) {
        // Only ASCII character in that range allowed
        var input = $(evt.target).val().toString()
        var inp_id = $(evt.target).attr("id")
        console.log(inp_id,"inp_id")
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        var check_error = true
        if(inp_id === 'contact' && input.length>9){
            check_error = false
        }
        if(inp_id === 'age' && input.length>2){
            check_error = false
        }
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
             check_error = false;
        }
        return check_error;
    }

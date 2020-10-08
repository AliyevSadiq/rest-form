$(document).ready(function(){


    if(getCookie('token')){
        window.location.href="/rest-form/index.html";
    }



    $("#btn_login").click(
        function(){
            sendAjaxForm('login_result', 'login_form', 'http://yii-rest-api/user/login');

            return false;
        }
    );


    function sendAjaxForm(result_form, ajax_form, url) {


        $.ajax({
            url:     url,
            type:     "POST",
            dataType: "html",
            data: $("#"+ajax_form).serialize(),
            success: function(response) {
                setCookie("token",response);

                if(getCookie('token')){
                    window.location.href="/rest-form/index.html";
                }

            },
            error: function(response) { // Данные не отправлены
                 $('#'+result_form).html('Ошибка. Данные не отправлены.');
            }
        });
    }




})
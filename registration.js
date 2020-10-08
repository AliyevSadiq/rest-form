$(document).ready(function(){


    if(getCookie('token')){
        window.location.href="/rest-form/index.html";
    }



    $("#btn_sign_up").click(
        function(){
            sendAjaxForm('sign_up_result', 'sign_up_form', 'http://yii-rest-api/user/sign');

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

                window.location.href="/rest-form/login.html";
            },
            error: function(response) { // Данные не отправлены
                 $('#'+result_form).html('Ошибка. Данные не отправлены.');
            }
        });
    }




})
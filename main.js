$(document).ready(function(){

    $.ajax({
        url: "http://yii-rest-api/user/check-auth?token="+ getCookie('token'),
        success: function(result){
           if(!result){
              document.cookie="token=";
               window.location.href="/rest-form/login.html";
           }
        },
        error:function (result) {
           console.log(result);
        }
    })
    if(!getCookie('token') ){
        $("#body_content").hide();
        window.location.href="/rest-form/login.html";
    }
    if(getCookie('token')==='null'){
        $("#body_content").hide();
        document.cookie="token=";
        window.location.href="/rest-form/login.html";
    }




    $("#blog_show").click(function(){
        $.ajax({
            url: "http://yii-rest-api/blog?token="+getCookie('token'),
            success: function(result){
                if(result!=='You need authorization!!!'){
                var i=0;
                for(i=0;i<result.length;i++ ){

                    $("tbody").append("<tr>"+
                        "<td>"+result[i]['title']+"</td>"+
                        "<td>"+result[i]['content']+"</td>"+
                        "<td>" +
                           "<a href='#' class='edit' data-id='"+result[i]['id']+"'>" +
                           "Edit" +
                            "</a>" +
                        "<a href='#' class='delete' data-id='"+result[i]['id']+"'>" +
                        " Delete" +
                        "</a>" +
                        "</td>"+
                        "</tr>");



                }
                    $("#blog_show").fadeOut();
                }else{
                    alert("You need authorization!!!");
                    window.location.href="/rest-form/login.html";
                }



            }
        }
        );
    });

    $("tbody").on('click','.edit',function(){
        var link =  "http://yii-rest-api/blog/edit?id="+$(this).data('id')+"&token="+getCookie('token');
        $.ajax({
            url: link,
            success: function(result){
                if(result!=='You need authorization!!!'){
              $("#blog-content").append(
                  "<p class='blog_name'>Blog Title:"+result['title']+"</p>"+"<p>"+
                  "<p>Blog Content:"+result['content']+"</p>"+"<p>"

              );
               if(document.querySelectorAll('#blog-content .blog_name').length>1){
                   location.reload();
               }
               }else{
                    alert("You need authorization!!!");
                    window.location.href="/rest-form/login.html";
                }



            }
        })

    });


    $("tbody").on('click','.delete',function(){
        var link =  "http://yii-rest-api/blog/delete?id="+$(this).data('id')+"&token="+getCookie('token');
        $(this).closest('tr').fadeOut();
        $.ajax({
            url: link,
            success: function(result){
                if(result==='You need authorization!!!') {
                    alert("You need authorization!!!");
                    window.location.href="/rest-form/login.html";
                }
            }

        })

    });




    $( document ).ready(function() {
        $("#logout").click(function(){
            $.ajax({
                url: "http://yii-rest-api/user/logout?token="+getCookie('token'),
                success: function(result){
                    document.cookie="token=";
                    window.location.href="/rest-form/login.html"
                },
                error:function (result) {
                    console.log(result);
                }
            })

        })

        $("#btn").click(
            function(){
                sendAjaxForm('result_form', 'ajax_form', "http://yii-rest-api/blog/create?token="+getCookie('token'));
                return false;
            }
        );
    });


    function sendAjaxForm(result_form, ajax_form, url) {


        $.ajax({
            url:     url,
            type:     "POST",
            dataType: "html",
            data: $("#"+ajax_form).serialize(),
            success: function(response) {
                console.log(response);
                if(response==='You need authorization!!!') {
                    alert("You need authorization!!!");
                    window.location.href="/rest-form/login.html";
                }
            },
            error: function(response) { // Данные не отправлены
               // $('#result_form').html('Ошибка. Данные не отправлены.');
            }
        });
    }
});
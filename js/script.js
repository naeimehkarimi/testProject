function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }
  
  function isPdf(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'pdf':
        //etc
        return true;
    }
    return false;
  }
$(document).ready(   
    function (e) {
    $("#form").on("submit", function (e) {
      e.preventDefault();
      nameRegex=/([\u0600-\u06FF]|[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc])+/i;
      ageRegex=/(\d)+/i;
      emailRegex=/([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/i;
      //(0|\+98|0098)?9[0123][0-9]{8}
      mobileRegex=/(0)?9[0-9]{9}/i;
      var fisrtnameState=nameRegex.test($("#name").val());
      var lastnameState=nameRegex.test($("#family").val());
      var ageState=ageRegex.test($("#age").val());
      if(ageState==true){
          var age=Number($("#age").val());
          if(age>=10&&age<=100) ageState=true;
          else ageState=false;
      }
      var emailState=emailRegex.test($("#email").val());
      var mobileState=mobileRegex.test($("#mobile").val());
      var file = $("#file");
      var isPDF=isPdf(file.val());
      if(fisrtnameState&&lastnameState&&ageState&&emailState&&mobileState&&isPDF){
        console.log("تمام موارد درست است!");
        $.ajax({
            url: "http://naeimehkarimi.ir/upload.php",
            type: "POST",
            data: new FormData(this),
            contentType: false,
            
            cache: false,
            processData: false,
            beforeSend: function () {
            //$("#preview").fadeOut();
            $("#err").fadeOut();
            },
            success: function (data) {
            if (data == "invalid") {
                // invalid file format.
                $("#err").html("Invalid File !").fadeIn();
            } else {
                // view uploaded file.
                $("#preview").html(data).fadeIn();
                $("#form")[0].reset();
                myParseData=JSON.parse(data);
                $("#nameRow").html(myParseData.name);
                $("#familyRow").html(myParseData.family);
                $("#ageRow").html(myParseData.age);
                $("#emailRow").html(myParseData.email);
                $("#mobileRow").html(myParseData.mobile);
                $("#cvRow").html('<a href="'+myParseData.file+'"> download CV</a>');
            }
            },
            error: function (e) {
            $("#err").html(e).fadeIn();
            },
        });
      }else{
          alert("یکی از موارد مشکل دارد!");
          if(!fisrtnameState) console.log("نام فارسی وارد شود");
          if(!lastnameState) console.log("نام خانوادگی فارسی وارد شود");
          if(!ageState) console.log("در وارد کردن سن اشتباهی شده است!!");
          if(!emailState) console.log("ایمیل وارد شده صحیح نمی باشد");
          if(!mobileState) console.log("شماره تلفن همراه صحیح نمی باشد");
          if(!isPDF) console.log("در وارد کردن فایل اشتباهی شده است!!");
      }

    });
  }
  );
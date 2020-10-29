$(document).ready(function() {

    //加载省份选择框
    fillProvince();


    //省份改变监听事件
    $("#province").change(function(e) {
        $("#city").empty();
        $("#city").append($("<option>").val("0").text("-请选择-"));
        var provinceId = $("#province").val();
        $.ajax({
            type: "POST",
            url: "getArea.do",
            data: { provinceId: provinceId },
            dataType: "json",
            success: function(response) {
                for (index = 0; index < response.length; index++) {
                    var option = $("<option>").val(response[index].cityId).text(response[index].cityName);
                    $("#city").append(option);
                }
            }
        });
    });


    //省份失去焦点绑定事件
    $("#province").blur(function(e) {
        if ($(this).find("option:selected").val() == "0") {
            $("#areaErrorInfo").text("省份不可以为空!");
            $("#areaErrorInfo").addClass("error");
        } else {
            $("#areaErrorInfo").text("errorInfo");
            $("#areaErrorInfo").removeClass("error");
        }
    });


    //城市失去焦点绑定事件
    $("#city").blur(function(e) {
        if ($(this).find("option:selected").val() == "0") {
            $("#areaErrorInfo").text("城市不可以为空!");
            $("#areaErrorInfo").addClass("error");
        } else {
            $("#areaErrorInfo").text("errorInfo");
            $("#areaErrorInfo").removeClass("error");
        }
    });


});

//加载省份选择框
function fillProvince() {
    var provinceId = $("#province").val();
    $.ajax({
        type: "POST",
        url: "getArea.do",
        data: { "provinceId": provinceId },
        dataType: "json",
        success: function(response) {
            for (var index = 0; index < response.length; index++) {
                var option = $("<option>").val(response[index].provinceId).text(response[index].provinceName);
                $("#province").append(option);
            }
        }
    });
}


//注册按钮的响应事件
/**
 * 实例化一个XMLHttpRequest对象
 */

var xmlHttpRequest;

function createXMLRequest() {
    if (window.XMLHttpRequest) {
        xmlHttpRequest = new XMLHttpRequest();
    } else {
        xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
}


//控件的onblur时间响应函数
function userNameOnblur() {
    var userName = document.getElementById("userName").value;
    var userNameErrorInfo = document.getElementById("userNameErrorInfo");

    var partten = /^[a-zA-Z]{1}([a-zA-Z0-9]){3,14}$/;

    if (userName == "") {
        userNameErrorInfo.innerText = "用户名不可以为空!";
        userNameErrorInfo.classList.add("error");
    } else if (!partten.exec(userName)) {
        userNameErrorInfo.innerText = "用户名必须由字母和数字组成，且以字母开头!";
        userNameErrorInfo.classList.add("error");
    } else {
        createXMLRequest();
        var url = "checkUserName.do";
        var data = "userName=" + userName;
        xmlHttpRequest.onreadystatechange = function() {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                var response = xmlHttpRequest.responseText;
                var json = JSON.parse(response);
                if (json.code == 0) {
                    userNameErrorInfo.innerText = "errorInfo";
                    userNameErrorInfo.classList.remove("error");
                } else {
                    userNameErrorInfo.innerText = json.info;
                    userNameErrorInfo.classList.add("error");
                }
            }
        }

        xmlHttpRequest.open("POST", url, true);
        xmlHttpRequest.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");

        xmlHttpRequest.send(data);

    }
}




function chrNameOnblur() {
    var chrName = document.getElementById("chrName").value;
    var chrNameErrorInfo = document.getElementById("chrNameErrorInfo");

    var partten = /^[\u4e00-\u9fa5]{2,4}$/;

    if (chrName == "") {
        chrNameErrorInfo.innerText = "中文名不可以为空!";
        chrNameErrorInfo.classList.add("error");
    } else if (!partten.exec(chrName)) {
        chrNameErrorInfo.innerText = "中文名只能是2-4长度的中文";
        chrNameErrorInfo.classList.add("error");
    } else {
        chrNameErrorInfo.innerText = "errorInfo";
        chrNameErrorInfo.classList.remove("error");
    }
}

function emailOnblur() {
    var email = document.getElementById("email").value;
    var emailErrorInfo = document.getElementById("emailErrorInfo");

    var partten = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

    if (email == "") {
        emailErrorInfo.innerText = "邮箱不可以为空!";
        emailErrorInfo.classList.add("error");
    } else if (!partten.exec(email)) {
        emailErrorInfo.innerText = "邮箱格式不正确!";
        emailErrorInfo.classList.add("error");
    } else {
        emailErrorInfo.innerText = "errorInfo";
        emailErrorInfo.classList.remove("error");
    }
}

// function areaOnblur() {


//     var area = document.getElementById("area");
//     var areaErrorInfo = document.getElementById("areaErrorInfo");

//     var city = document.getElementById("city");

//     var areaIndex = area.selectedIndex;
//     var cityIndex = city.selectedIndex;

//     if (area[areaIndex].value == "0") {
//         areaErrorInfo.innerText = "省份不可以为空!";
//         areaErrorInfo.classList.add("error");
//     } else if (city[cityIndex].value == "0") {
//         areaErrorInfo.innerText = "城市不可以为空!";
//         areaErrorInfo.classList.add("error");
//     } else {
//         areaErrorInfo.innerText = "errorInfo";
//         areaErrorInfo.classList.remove("error");
//     }
// }




function passwordOnblur() {
    var password = document.getElementById("password").value;
    var enterPassword = document.getElementById("enterPassword").value;
    var passwordErrorInfo = document.getElementById("passwordErrorInfo");
    if (password == "") {
        passwordErrorInfo.innerText = "密码不可以为空!";
        passwordErrorInfo.classList.add("error");
    } else if (password.length < 4) {
        passwordErrorInfo.innerText = "密码长度不可以小于4!";
        passwordErrorInfo.classList.add("error");
    } else if (enterPassword != "" && password != enterPassword) {
        passwordErrorInfo.innerText = "两次输入密码不一致!";
        passwordErrorInfo.classList.add("error");
    } else {
        passwordErrorInfo.innerText = "errorInfo";
        passwordErrorInfo.classList.remove("error");
    }
}

function enterPasswordOnblur() {
    var password = document.getElementById("password").value;
    var enterPassword = document.getElementById("enterPassword").value;
    var enterPasswordErrorInfo = document.getElementById("enterPasswordErrorInfo");
    if (enterPassword == "") {
        enterPasswordErrorInfo.innerText = "密码不可以为空!";
        enterPasswordErrorInfo.classList.add("error");
    } else if (enterPassword != password) {
        enterPasswordErrorInfo.innerText = "两次输入的密码不一致!";
        enterPasswordErrorInfo.classList.add("error");
    } else {
        enterPasswordErrorInfo.innerText = "errorInfo";
        enterPasswordErrorInfo.classList.remove("error");
    }
}


//注册按钮响应

$("#registerButton").click(function(e) {

    var userNameErrorInfo = document.getElementById("userNameErrorInfo");
    var chrNameErrorInfo = document.getElementById("chrNameErrorInfo");
    var emailErrorInfo = document.getElementById("emailErrorInfo");
    var areaErrorInfo = document.getElementById("areaErrorInfo");
    var passwordErrorInfo = document.getElementById("passwordErrorInfo");
    var enterPasswordErrorInfo = document.getElementById("enterPasswordErrorInfo");

    //对所有数据进行和一次格式检查
    userNameOnblur();
    chrNameOnblur();
    emailOnblur();
    passwordOnblur();
    enterPasswordOnblur();
    /**
     * 先判断输入信息是否有错误  再访问服务器
     */
    if (!userNameErrorInfo.classList.contains("error") &&
        !chrNameErrorInfo.classList.contains("error") &&
        !emailErrorInfo.classList.contains("error") &&
        !areaErrorInfo.classList.contains("error") &&
        !passwordErrorInfo.classList.contains("error") &&
        !enterPasswordErrorInfo.classList.contains("error")
    ) {
        if (registerErrorInfo.classList.contains("error")) {
            registerErrorInfo.innerText = "errorInfo";
            registerErrorInfo.classList.remove("error");
        }

        $.ajax({
            type: "post",
            url: "register.do",
            data: {
                "userName": $("#userName").val(),
                "chrName": $("#chrName").val(),
                "email": $("#email").val(),
                "provinceName": $("#province").find("option:selected").text(),
                "cityName": $("#city").find("option:selected").text(),
                "password": $("#password").val()
            },
            dataType: "json",
            success: function(response) {
                if (response.code == 0) {
                    alert(response.info);
                    window.location.href = "index.html";
                } else {
                    alert(response.info + " 请检查输入数据是否正确!");
                }
            }
        });
    } else {
        registerErrorInfo.innerText = "请完善信息!";
        registerErrorInfo.classList.add("error");
    }
});
//获取输入框控件

function ChangeImage() {
    var verityImage = document.getElementById("verityCodeImage");
    verityImage.src = "verityCodeController.do?t=" + Math.random();
}

var xmlHttpRequest;

//创建XMLHttpRequest对象
function createXMLHttpRequest() {
    if (window.XMLHttpRequest) {
        xmlHttpRequest = new XMLHttpRequest();
    } else {
        xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
}

//对登录界面的输入框进行监测
function checkUserName(obj) {
    var userNameErrorInfo = document.getElementById("userNameErrorInfo");
    if (obj.value == "") {
        var errorInfo = "用户名不能为空！";
        userNameErrorInfo.innerText = errorInfo;
        userNameErrorInfo.classList.add("error");
    } else {
        var errorInfo = "errorInfo";
        userNameErrorInfo.innerText = errorInfo;
        userNameErrorInfo.classList.remove("error");
    }
}

function checkPassword(obj) {
    var passwordErrorInfo = document.getElementById("passwordErrorInfo");
    if (obj.value == "") {
        var errorInfo = "密码不能为空！";
        passwordErrorInfo.innerText = errorInfo;
        passwordErrorInfo.classList.add("error");
    } else {
        var errorInfo = "errorInfo";
        passwordErrorInfo.innerText = errorInfo;
        passwordErrorInfo.classList.remove("error");
    }
}

function checkUserCode(obj) {
    var userCodeErrorInfo = document.getElementById("userCodeErrorInfo");
    if (obj.value == "") {
        var errorInfo = "验证码不能为空！";
        userCodeErrorInfo.innerText = errorInfo;
        userCodeErrorInfo.classList.add("error");
    } else {
        var errorInfo = "errorInfo";
        userCodeErrorInfo.innerText = errorInfo;
        userCodeErrorInfo.classList.remove("error");
    }
}

function LoginButtonClick() {

    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    var userCode = document.getElementById("userCode").value;
    var autoLogin = document.getElementById("autoLogin").checked;

    var userNameErrorInfo = document.getElementById("userNameErrorInfo");
    var passwordErrorInfo = document.getElementById("passwordErrorInfo");
    var userCodeErrorInfo = document.getElementById("userCodeErrorInfo");

    //先判断三个输入框存不存在error信息 如若不存在就访问登录的Servlet
    if (!userNameErrorInfo.classList.contains("error") &&
        !passwordErrorInfo.classList.contains("error") &&
        !userCodeErrorInfo.classList.contains("error")
    ) {
        createXMLHttpRequest();
        var url = "login.do";

        var data = "userName=" + userName + "&password=" + password + "&userCode=" + userCode + "&autoLogin=" + autoLogin;

        xmlHttpRequest.onreadystatechange = LoginReadyStateChange;

        xmlHttpRequest.open("post", url, true);
        xmlHttpRequest.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");

        xmlHttpRequest.send(data);

    }
}

function LoginReadyStateChange() {
    var userNameErrorInfo = document.getElementById("userNameErrorInfo");
    var passwordErrorInfo = document.getElementById("passwordErrorInfo");
    var userCodeErrorInfo = document.getElementById("userCodeErrorInfo");
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var response = xmlHttpRequest.responseText;
        var json = JSON.parse(response);
        if (json.code == 0) {
            window.location.href = "main.jsp";
        } else if (json.code == 1) {
            userCodeErrorInfo.innerHTML = json.info;
            userCodeErrorInfo.classList.add("error");
        } else if (json.code == 2) {
            userNameErrorInfo.innerHTML = json.info;
            userNameErrorInfo.classList.add("error");
        } else if (json.code == 3) {
            passwordErrorInfo.innerHTML = json.info;
            passwordErrorInfo.classList.add("error");
        } else {
            alert("服务器返回错误" + json.code + json.info);
        }
    }
}
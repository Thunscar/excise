<%--
  Created by IntelliJ IDEA.
  User: Thunscar
  Date: 2020/9/21
  Time: 17:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>error</title>
    <style type="text/css">@import "css/error.css";</style>
    <script src="js/exitTime.js"></script>

</head>
<body onload="ChangeLeaveTime()">
    <div class="div1">
        <img src="images/error.png"  width="300" height="300">
    </div>
    <div class="div3"></div>
    <div class="div2">
        <p class="errorInfo">
            <font color="red"><strong>${errorInfo}</strong></font>
            <br><br>
            <font ><strong id="time" style="color: red">
            </strong>秒后返回登录界面</font>
            <br><br>
            <strong>不能跳转,请<font color="red">

                <i style="color: red;cursor: pointer" onclick="returnBack()">点击这儿</i>

            </font></strong>

        </p>
    </div>
</body>
</html>

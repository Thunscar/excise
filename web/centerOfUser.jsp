<%--
  Created by IntelliJ IDEA.
  User: Thunscar
  Date: 2020/10/7
  Time: 9:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head >
    <style type="text/css">@import "css/main.css";</style>

    <title>Chicken WebSite</title>




</head>
<body>


<div class="divOne">
    <img src="images/mainHeadIcon.png" alt="Chicken Website" class="styleImgMain">

</div>
<div class="divFive">
    <p >
        <font size="4%" color="#a9a9a9">
            Design From
        </font>

    </p>
    <p>
        <font size="6%" color="black">
            <span>&nbsp;&nbsp;ChenWei.com</span>
        </font>
    </p>
</div>
<div class="divTwo" style="text-align: right">
    <br>
    <p>

    <form method="post" id="ExitPage">
        <label>
            <font color="black" size="4%">欢迎您:&nbsp;${User.chrName}</font>
        </label>
        <label onClick="returnBack()" class="pointer">
            <font color="blue" size="4%">&nbsp;【安全退出】</font>
        </label>
    </form>

    </p>
</div>
<div class="divThree" style="text-align: right;margin-top: 20px;" >
    <form method="post" id="CheckPage">
        <label onClick="" class="pointer" >
            <font color="#261919" size="5">&nbsp;首页&nbsp;</font>
        </label>
        <label onclick="goToDownload()" class="pointer" >
            <font color="#261919" size="5">|&nbsp;资源下载&nbsp;</font>
        </label>
        <label onClick="goToUserManager()" class="pointer" >
            <font color="#261919" size=5>|&nbsp;用户管理&nbsp;</font>
        </label>
        <label onClick="goToResourceManager()" class="pointer" >
            <font color="#261919" size="5">|&nbsp;资源管理&nbsp;</font>
        </label>
        <label onClick="goToCenterOfUser()" class="pointer" >
            <font color="#261919" size="5">|&nbsp;个人中心&nbsp;</font>
        </label>

    </form>


</div>
<div class="divFour">
    <div class="divLine">
    </div>
    <br>
    <i>建设中</i>
</div>

<script  src="js/main.js"></script>
</body>
</html>

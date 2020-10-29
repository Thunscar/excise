//菜单键的选中状态

$(document).ready(function() {
    //初试化信息

    //初始化菜单的选中状态
    $("#unit1").addClass("select");
    $("#unitImage1").addClass("select");
    var tag = "1";

    //初始化内容界面的内容状态
    $("#unit1Content").show();
    $("#unit2Content").hide();
    $("#unit3Content").hide();
    $("#unit4Content").hide();
    $("#unit5Content").hide();

    //初试化用户操作的弹出框
    $("#user_opera_window").hide();


    //设置用户操作弹出框监听鼠标事件
    $("#user_controller").mouseover(function() {
        $("#user_opera_window").show(100);
    });

    $("#user_controller").mouseleave(function(e) {
        x = e.pageX;
        y = e.pageY;
        var windowDiv = $("#user_opera_window");
        var y1 = windowDiv.offset().top - 30;
        var y2 = y1 + windowDiv.height();
        var x1 = windowDiv.offset().left;
        var x2 = x1 + windowDiv.width();
        if (x < x1 || x > x2 || y < y1 || y > y2) {
            $("#user_opera_window").hide(100);
        }
    });

    $("#user_opera_window").mouseleave(function(e) {
        x = e.pageX;
        y = e.pageY;
        var windowDiv = $("#user_controller");
        var y1 = windowDiv.offset().top;
        var y2 = y1 + windowDiv.height();
        var x1 = windowDiv.offset().left;
        var x2 = x1 + windowDiv.width();
        if (x < x1 || x > x2 || y < y1 || y > y2) {
            $("#user_opera_window").hide(100);
        }

    });


    //用户操作栏鼠标移到监听事件
    $("#user_opera_window_unit1").mouseover(function() {
        $("#user_opera_window_unit1").addClass("select");
    });
    $("#user_opera_window_unit2").mouseover(function() {
        $("#user_opera_window_unit2").addClass("select");
    });
    $("#user_opera_window_unit3").mouseover(function() {
        $("#user_opera_window_unit3").addClass("select");
    });

    $("#user_opera_window_unit1").mouseleave(function() {
        $("#user_opera_window_unit1").removeClass("select");
    });
    $("#user_opera_window_unit2").mouseleave(function() {
        $("#user_opera_window_unit2").removeClass("select");
    });
    $("#user_opera_window_unit3").mouseleave(function() {
        $("#user_opera_window_unit3").removeClass("select");
    });



    //设置用户操作栏的点击操作事件
    //账号管理点击事件监听
    $("#user_opera_window_unit1").click(function(e) {

    });
    //切换单位点击事件监听
    $("#user_opera_window_unit2").click(function(e) {

    });
    //退出账号点击事件监听
    $("#user_opera_window_unit3").click(function(e) {
        $.ajax({
            type: "post",
            url: "exitLogin.do",
            data: null,
            dataType: "json",
            success: function(response) {
                if (response.code == "100") {
                    window.location.href = "index.html";
                }
            }
        });
    });


    //设置菜单栏的mouseover属性
    $("#unit1").mouseover(function() {
        $("#unit1").addClass("over");
    });

    $("#unit2").mouseover(function() {
        $("#unit2").addClass("over");
    });

    $("#unit3").mouseover(function() {
        $("#unit3").addClass("over");
    });

    $("#unit4").mouseover(function() {
        $("#unit4").addClass("over");
    });

    $("#unit5").mouseover(function() {
        $("#unit5").addClass("over");
    });


    //菜单栏的mouseleave属性
    $("#unit1").mouseleave(function() {
        $("#unit1").removeClass("over");
    });

    $("#unit2").mouseleave(function() {
        $("#unit2").removeClass("over");
    });

    $("#unit3").mouseleave(function() {
        $("#unit3").removeClass("over");
    });

    $("#unit4").mouseleave(function() {
        $("#unit4").removeClass("over");
    });

    $("#unit5").mouseleave(function() {
        $("#unit5").removeClass("over");
    });

    //菜单栏的点击事件

    //首页 单击事件
    $("#unit1").click(function(e) {
        if (tag != "1") {
            $("#unit" + tag).removeClass("select");
            $("#unitImage" + tag).removeClass("select");
            $("#unit" + tag + "Content").hide();
            tag = "1";

            $("#showSelectName").text("首页");
            $("#unit1").addClass("select");
            $("#unitImage1").addClass("select");

            $("#unit1Content").show();
        }

    });

    //资源下载  单击事件
    $("#unit2").click(function(e) {
        if (tag != "2") {
            $("#unit" + tag).removeClass("select");
            $("#unitImage" + tag).removeClass("select");
            $("#unit" + tag + "Content").hide();
            tag = "2";

            $("#showSelectName").text("资源下载");
            $("#unit2").addClass("select");
            $("#unitImage2").addClass("select");

            $("#unit2Content").empty();
            $("#unit2Content").show();
            $.ajax({
                type: "post",
                url: "getDownloadList.do",
                data: null,
                dataType: "json",
                success: function(response) {
                    for (var index = 0; index < response.length; index++) {
                        var contentDiv = $("<div></div>").attr("class", "downloadUtilDiv");

                        var dDownloadIcon = $("<div>").attr("class", "dIcon");
                        var dIconImage = $("<img>").attr("src", response[index].image).addClass("imageIcon");
                        dDownloadIcon.append(dIconImage);

                        var dDownloadName = $("<div>").attr("class", "dName");
                        var dName = $("<i>").text(response[index].name);
                        var dSizeStar = $("<div>").attr("class", "starContainer");
                        var size = $("<i>").text("大小:" + response[index].size + "星级:");
                        var star = $("<i>").attr("class", "star");
                        var starImage = $("<span>").attr("class", "spanstar").attr("style", "width:" + response[index].star / 5 * 100 + "%;");
                        star.append(starImage);
                        dSizeStar.append(size, star);
                        dDownloadName.append(dName, dSizeStar);

                        var dDesc = $("<div>").text(response[index].description).attr("class", "dDesc");
                        var dDown = $("<div>").attr("class", "dDown");
                        var dDownButton = $("<a>").attr("href", "download.do?id=" + response[index].id).attr("class", "downButton").text("立即下载");
                        dDown.append(dDownButton);

                        contentDiv.append(dDownloadIcon, dDownloadName, dDesc, dDown);

                        $("#unit2Content").append(contentDiv);
                    }
                }
            });
        }
    });


    //资源管理 单击事件
    $("#unit3").click(function(e) {
        if (tag != "3") {
            $("#unit" + tag).removeClass("select");
            $("#unitImage" + tag).removeClass("select");
            $("#unit" + tag + "Content").hide();
            tag = "3";

            $("#showSelectName").text("资源管理");
            $("#unit3").addClass("select");
            $("#unitImage3").addClass("select");


            $("#unit3Content_info").empty();

            $("#resource_controller_content").hide();
            $("#unit3Content").show();

            $.ajax({
                type: "post",
                url: "resourceManager.do",
                data: null,
                dataType: "json",
                success: function(response) {
                    if (response.code == 0) {
                        $("#resource_controller_content").show();
                    } else {
                        var info = $("<i>").text(response.message);
                        $("#unit3Content_info").append(info);
                    }
                }
            });
        }

    });


    //用户管理 单击事件
    $("#unit4").click(function(e) {
        if (tag != "4") {
            $("#unit" + tag).removeClass("select");
            $("#unitImage" + tag).removeClass("select");
            $("#unit" + tag + "Content").hide();
            tag = "4";

            $("#showSelectName").text("用户管理");
            $("#unit4").addClass("select");
            $("#unitImage4").addClass("select");

            $("#unit4Content_info").empty();

            $("#user_controller_content").hide();
            $("#unit4Content").show();

            $.ajax({
                type: "post",
                url: "userManager.do",
                data: null,
                dataType: "json",
                success: function(response) {
                    if (response.code == 0) {
                        $("#user_controller_content").show();
                    } else {
                        var info = $("<i>").text(response.message);
                        $("#unit4Content_info").append(info);
                    }
                }
            });
        }

    });



    //个人中心 单击事件
    $("#unit5").click(function(e) {
        if (tag != "5") {
            $("#unit" + tag).removeClass("select");
            $("#unitImage" + tag).removeClass("select");
            $("#unit" + tag + "Content").hide();
            tag = "5";

            $("#showSelectName").text("个人中心");
            $("#unit5").addClass("select");
            $("#unitImage5").addClass("select");

            $("#unit5Content").empty();
            $("#unit5Content").show();

            $.ajax({
                type: "post",
                url: "userCenter.do",
                data: null,
                dataType: "json",
                success: function(response) {
                    var info = $("<i>").text(response);
                    $("#unit5Content").append(info);
                }
            });

        }

    });



});
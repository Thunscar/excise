$(document).ready(function() {

    /**
     * 初始化操作
     */
    doQuery();
    //加载弹出框省份选择框
    fillProvince();
    //省份改变监听事件
    $("#pop_window_province").change(provinceChange);

    /**
     * 定义全局变量
     */
    //表格 用户名 省份 城市 排序状态
    var table_userName_status = 0;
    var table_province_status = 0;

    //全选 复选框点击绑定事件
    $("#all_checkbox").change(function(e) {
        if (this.checked == true) {
            $("tbody tr input:checkbox").prop("checked", true);
            $("tbody tr").addClass("tr_select");
        } else {
            $("tbody tr input:checkbox").prop("checked", false);
            $("tbody tr").removeClass("tr_select");
        }
    });

    /**
     * 工具栏按钮点击事件
     **/

    //查找按钮点击事件
    $("#search_btn").click(doQuery);

    //清空按钮点击事件
    $("#clean_btn").click(function(e) {
        $("#userName,#chrName,#email,#province,#city").val("");
    });

    //增加按钮点击事件
    $("#insert_btn").click(function(e) {
        $("#pop_window_title").text("添加用户");
        $("#operaButton").val("添加用户");
        $("#pop_window").addClass("show");
        $("#pop_window_input").addClass("show");
    });

    //删除按钮点击事件
    $("#delete_btn").click(function(e) {});

    //修改按钮点击事件
    $("#update_btn").click(function(e) {
        $("#pop_window_title").text("修改用户信息");
        $("#operaButton").val("确认修改");
        $("#pop_window").addClass("show");
        $("#pop_window_input").addClass("show");
    });

    //关闭页面按钮监控
    $("#closeButton").click(function(e) {
        $("#pop_window").removeClass("show");
        $("#pop_window_input").removeClass("show");
    });

    /**
     * 页码操作事件
     */

    //首页
    $("#first_page").click(function(e) {
        //先判断是否可以进行当前操作
        if ($("#page_num").text() == 1) {
            alert("当前页就是首页！");
            return;
        }
        //查询条件信息
        var userName = $("#userName").val();
        var chrName = $("#chrName").val();
        var email = $("#email").val();
        var provinceName = $("#province").val();
        //页码
        var page_size = $("#page_size").find("option:selected").text();

        //页码设置为第一页
        var page_num = "1";

        //排序信息
        var sort;
        var sort_order;
        if (table_userName_status != 0) {
            sort = "userName";
            if (table_userName_status == 1) {
                sort_order = "desc";
            } else if (table_userName_status == 2) {
                sort_order = "";
            }
        } else if (table_province_status != 0) {
            sort = "provinceName";
            if (table_province_status == 1) {
                sort_order = "desc";
            } else if (table_province_status == 2) {
                sort_order = "";
            }
        } else {
            sort = "";
            sort_order = "";
        }


        var query_params = {
            "userName": userName,
            "chrName": chrName,
            "email": email,
            "provinceName": provinceName
        };
        var page_params = {
            "page_size": page_size,
            "page_num": page_num,
            "sort": sort,
            "sort_order": sort_order
        };

        //发送ajax请求
        $.ajax({
            type: "post",
            url: "searchUser.do",
            data: {
                "query_params": JSON.stringify(query_params),
                "page_params": JSON.stringify(page_params)
            },
            dataType: "json",
            success: function(response) {
                var users = response.users;
                var total = response.total;
                var total_page = Math.ceil(total / page_size);
                $("#total_page").text(total_page);
                $("#total_data").text(total);
                $("tbody").empty();
                //将页码设置为1
                $("#page_num").text("1");
                //遍历结果
                $.each(users, function(index, user) {
                    var s = JSON.stringify(user);
                    var str = "<tr data='" + s + "'>";
                    str = str + "<td><input type='checkbox' value='" + user.userName + "'/></td>";
                    str = str + "<td>" + user.userName + "</td>";
                    str = str + "<td>" + user.chrName + "</td>";
                    str = str + "<td>" + user.email + "</td>";
                    str = str + "<td>" + user.provinceName + "</td>";
                    str = str + "<td>" + user.cityName + "</td>";
                    str = str + "<td><a href='#' id='delbtn' value='" + user.userName + "'>删除</a>&nbsp;&nbsp;";
                    str = str + "<a href='#' id='updatebtn' value='" + user.userName + "'>修改</a></td>";
                    str = str + "</tr>";
                    $("tbody").append(str);
                });
                $("tbody tr:even").addClass("tr_even");
                $("tbody tr:odd").addClass("tr_odd");
            }
        });
    });

    //尾页
    $("#final_page").click(function(e) {
        //先判断是否可以进行当前操作
        if ($("#page_num").text() == $("#total_page").text()) {
            alert("当前页就是尾页！");
            return;
        }
        //查询条件信息
        var userName = $("#userName").val();
        var chrName = $("#chrName").val();
        var email = $("#email").val();
        var provinceName = $("#province").val();
        //页码
        var page_size = $("#page_size").find("option:selected").text();

        //页码设置为尾页
        var page_num = $("#total_page").text();

        //排序信息
        var sort;
        var sort_order;
        if (table_userName_status != 0) {
            sort = "userName";
            if (table_userName_status == 1) {
                sort_order = "desc";
            } else if (table_userName_status == 2) {
                sort_order = "";
            }
        } else if (table_province_status != 0) {
            sort = "provinceName";
            if (table_province_status == 1) {
                sort_order = "desc";
            } else if (table_province_status == 2) {
                sort_order = "";
            }
        } else {
            sort = "";
            sort_order = "";
        }


        var query_params = {
            "userName": userName,
            "chrName": chrName,
            "email": email,
            "provinceName": provinceName
        };
        var page_params = {
            "page_size": page_size,
            "page_num": page_num,
            "sort": sort,
            "sort_order": sort_order
        };

        //发送ajax请求
        $.ajax({
            type: "post",
            url: "searchUser.do",
            data: {
                "query_params": JSON.stringify(query_params),
                "page_params": JSON.stringify(page_params)
            },
            dataType: "json",
            success: function(response) {
                var users = response.users;
                var total = response.total;
                var total_page = Math.ceil(total / page_size);
                $("#total_page").text(total_page);
                $("#total_data").text(total);
                $("tbody").empty();
                //将页码设置为总页数（也就是最后一页）
                $("#page_num").text($("#total_page").text());
                //遍历结果
                $.each(users, function(index, user) {
                    var s = JSON.stringify(user);
                    var str = "<tr data='" + s + "'>";
                    str = str + "<td><input type='checkbox' value='" + user.userName + "'/></td>";
                    str = str + "<td>" + user.userName + "</td>";
                    str = str + "<td>" + user.chrName + "</td>";
                    str = str + "<td>" + user.email + "</td>";
                    str = str + "<td>" + user.provinceName + "</td>";
                    str = str + "<td>" + user.cityName + "</td>";
                    str = str + "<td><a href='#' id='delbtn' value='" + user.userName + "'>删除</a>&nbsp;&nbsp;";
                    str = str + "<a href='#' id='updatebtn' value='" + user.userName + "'>修改</a></td>";
                    str = str + "</tr>";
                    $("tbody").append(str);
                });
                $("tbody tr:even").addClass("tr_even");
                $("tbody tr:odd").addClass("tr_odd");
            }
        });
    });

    //上一页
    $("#last_page").click(function(e) {

        //先判断是否可以进行当前操作
        if ($("#page_num").text() == 1) {
            alert("当前页是第一页！");
            return;
        }

        //查询条件信息
        var userName = $("#userName").val();
        var chrName = $("#chrName").val();
        var email = $("#email").val();
        var provinceName = $("#province").val();
        //页码
        var page_size = $("#page_size").find("option:selected").text();

        //页码设置为第一页
        var page_num = (parseInt($("#page_num").text()) - 1).toString();

        //排序信息
        var sort;
        var sort_order;
        if (table_userName_status != 0) {
            sort = "userName";
            if (table_userName_status == 1) {
                sort_order = "desc";
            } else if (table_userName_status == 2) {
                sort_order = "";
            }
        } else if (table_province_status != 0) {
            sort = "provinceName";
            if (table_province_status == 1) {
                sort_order = "desc";
            } else if (table_province_status == 2) {
                sort_order = "";
            }
        } else {
            sort = "";
            sort_order = "";
        }


        var query_params = {
            "userName": userName,
            "chrName": chrName,
            "email": email,
            "provinceName": provinceName
        };
        var page_params = {
            "page_size": page_size,
            "page_num": page_num,
            "sort": sort,
            "sort_order": sort_order
        };

        //发送ajax请求
        $.ajax({
            type: "post",
            url: "searchUser.do",
            data: {
                "query_params": JSON.stringify(query_params),
                "page_params": JSON.stringify(page_params)
            },
            dataType: "json",
            success: function(response) {
                var users = response.users;
                var total = response.total;
                var total_page = Math.ceil(total / page_size);
                $("#total_page").text(total_page);
                $("#total_data").text(total);
                $("tbody").empty();
                //将页码设置为总页数（也就是最后一页）
                $("#page_num").text((parseInt($("#page_num").text()) - 1).toString());
                //遍历结果
                $.each(users, function(index, user) {
                    var s = JSON.stringify(user);
                    var str = "<tr data='" + s + "'>";
                    str = str + "<td><input type='checkbox' value='" + user.userName + "'/></td>";
                    str = str + "<td>" + user.userName + "</td>";
                    str = str + "<td>" + user.chrName + "</td>";
                    str = str + "<td>" + user.email + "</td>";
                    str = str + "<td>" + user.provinceName + "</td>";
                    str = str + "<td>" + user.cityName + "</td>";
                    str = str + "<td><a href='#' id='delbtn' value='" + user.userName + "'>删除</a>&nbsp;&nbsp;";
                    str = str + "<a href='#' id='updatebtn' value='" + user.userName + "'>修改</a></td>";
                    str = str + "</tr>";
                    $("tbody").append(str);
                });
                $("tbody tr:even").addClass("tr_even");
                $("tbody tr:odd").addClass("tr_odd");
            }
        });
    });

    //下一页
    $("#next_page").click(function(e) {

        //先判断是否可以进行当前操作
        if ($("#page_num").text() == $("#total_page").text()) {
            alert("当前页是最后一页！");
            return;
        }

        //查询条件信息
        var userName = $("#userName").val();
        var chrName = $("#chrName").val();
        var email = $("#email").val();
        var provinceName = $("#province").val();
        //页码
        var page_size = $("#page_size").find("option:selected").text();

        //页码设置为第一页
        var page_num = (parseInt($("#page_num").text()) + 1).toString();

        //排序信息
        var sort;
        var sort_order;
        if (table_userName_status != 0) {
            sort = "userName";
            if (table_userName_status == 1) {
                sort_order = "desc";
            } else if (table_userName_status == 2) {
                sort_order = "";
            }
        } else if (table_province_status != 0) {
            sort = "provinceName";
            if (table_province_status == 1) {
                sort_order = "desc";
            } else if (table_province_status == 2) {
                sort_order = "";
            }
        } else {
            sort = "";
            sort_order = "";
        }


        var query_params = {
            "userName": userName,
            "chrName": chrName,
            "email": email,
            "provinceName": provinceName
        };
        var page_params = {
            "page_size": page_size,
            "page_num": page_num,
            "sort": sort,
            "sort_order": sort_order
        };

        //发送ajax请求
        $.ajax({
            type: "post",
            url: "searchUser.do",
            data: {
                "query_params": JSON.stringify(query_params),
                "page_params": JSON.stringify(page_params)
            },
            dataType: "json",
            success: function(response) {
                var users = response.users;
                var total = response.total;
                var total_page = Math.ceil(total / page_size);
                $("#total_page").text(total_page);
                $("#total_data").text(total);
                $("tbody").empty();
                //将页码设置为总页数（也就是最后一页）
                $("#page_num").text((parseInt($("#page_num").text()) + 1).toString());
                //遍历结果
                $.each(users, function(index, user) {
                    var s = JSON.stringify(user);
                    var str = "<tr data='" + s + "'>";
                    str = str + "<td><input type='checkbox' value='" + user.userName + "'/></td>";
                    str = str + "<td>" + user.userName + "</td>";
                    str = str + "<td>" + user.chrName + "</td>";
                    str = str + "<td>" + user.email + "</td>";
                    str = str + "<td>" + user.provinceName + "</td>";
                    str = str + "<td>" + user.cityName + "</td>";
                    str = str + "<td><a href='#' id='delbtn' value='" + user.userName + "'>删除</a>&nbsp;&nbsp;";
                    str = str + "<a href='#' id='updatebtn' value='" + user.userName + "'>修改</a></td>";
                    str = str + "</tr>";
                    $("tbody").append(str);
                });
                $("tbody tr:even").addClass("tr_even");
                $("tbody tr:odd").addClass("tr_odd");
            }
        });

    });

    /**
     * 鼠标事件
     */
    $("tbody").on("mouseover", "tr", function() {
        $(this).addClass("tr_hover");
    });

    $("tbody").on("mouseleave", "tr", function() {
        $(this).removeClass("tr_hover");
    });

    $("tbody").on("click", "tr input:checkbox", function() {
        if (this.checked == true) {
            $(this).parents("tr").addClass("tr_select");
        } else {
            $(this).parents("tr").removeClass("tr_select");
        }
    });
    //动态产生的删除 修改操作
    $("tbody").on("click", "#delbtn", function() {
        var selectValue = $(this).attr("value");
    });

    //修改用户信息
    $("tbody").on("click", "#updatebtn", function() {
        var userName = $(this).attr("value");
        //先获取需要修改的用户信息
        $.ajax({
            type: "post",
            url: "getUserInfo.do",
            data: { "userName": userName },
            dataType: "json",
            success: function(response) {
                    if (response.code == 0) {
                        var user = response.info;
                        $("#pop_window_userName").val(user.userName);
                        $("#pop_window_userName").attr("readonly", "readonly");
                        $("#pop_window_chrName").val(user.chrName);
                        $("#pop_window_email").val(user.email);
                        $("#pop_window_password").val(user.password);
                        $("#pop_window_enterPassword").val(user.password);

                        $("#pop_window_province option").each(function() {
                            if ($(this).text() == user.provinceName) {
                                $(this).prop("selected", true);
                            }
                        });

                        // $("#pop_window_city").empty();
                        // $("#pop_window_city").append($("<option>").val("0").text("-请选择-"));
                        // $("#pop_window_city").append($("<option>").text(user.cityName).prop("selected", true));

                        $("#pop_window_city").empty();
                        $("#pop_window_city").append($("<option>").val("0").text("-请选择-"));
                        var provinceId = $("#pop_window_province").val();
                        $.ajax({
                            type: "POST",
                            url: "getArea.do",
                            data: { provinceId: provinceId },
                            dataType: "json",
                            success: function(response) {
                                for (index = 0; index < response.length; index++) {
                                    var option = $("<option>").val(response[index].cityId).text(response[index].cityName);
                                    $("#pop_window_city").append(option);
                                }
                                $("#pop_window_city option").each(function() {
                                    if ($(this).text() == user.cityName) {
                                        $(this).prop("selected", true);
                                    }
                                });
                            }
                        });


                        //弹出框信息初始化
                        $("#pop_window_title").text("修改用户信息");

                        $("#operaButton").val("确认修改");
                        $("#pop_window").addClass("show");
                        $("#pop_window_input").addClass("show");

                    } else {
                        alert(response.info);
                    }
                }
                //将信息填入弹出框
        });
    });
    //弹出框 事件监听
    //操作按钮点击事件
    $("#operaButton").click(function(e) {
        var opera = $(this).attr("value");

        //修改用户信息按钮被点击
        if (opera == "确认修改") {
            updateUser();
            return;
        }

        //确认添加用户按钮被点击
        if (opera == "添加用户") {
            insertUser();
            return;
        }
    });

    //加载省份选择框
    function fillProvince() {
        var provinceId = $("#pop_window_province").val();
        $.ajax({
            type: "POST",
            url: "getArea.do",
            data: { "provinceId": provinceId },
            dataType: "json",
            success: function(response) {
                for (var index = 0; index < response.length; index++) {
                    var option = $("<option>").val(response[index].provinceId).text(response[index].provinceName);
                    $("#pop_window_province").append(option);
                }
            }
        });
    }

    function updateUser() {

        var userName = $("#pop_window_userName").val();
        var chrName = $("#pop_window_chrName").val();
        var email = $("#pop_window_email").val();
        var password = $("#pop_window_password").val();

        var provinceName = $("#pop_window_province").find("option:selected").text();
        var cityName = $("#pop_window_city").find("option:selected").text();


        var user = {
            "userName": userName,
            "chrName": chrName,
            "email": email,
            "password": password,
            "provinceName": provinceName,
            "cityName": cityName
        };
        $.ajax({
            type: "post",
            url: "updateUser.do",
            data: {
                "user": JSON.stringify(user)
            },
            dataType: "json",
            success: function(response) {
                alert(response);
                //关闭页面
                $("#pop_window").removeClass("show");
                $("#pop_window_input").removeClass("show");
            }
        });

    }

    function insertUser() {

    }

    /**
     * 用户名 省份排序事件
     */
    //用户名 省份排序键
    $("#table_userName").mouseover(function() {
        $(this).addClass("mouse_over");
    });

    $("#table_userName").mouseleave(function() {
        $(this).removeClass("mouse_over");
    });


    $("#table_province").mouseover(function() {
        $(this).addClass("mouse_over");
    });


    $("#table_province").mouseleave(function() {
        $(this).removeClass("mouse_over");
    });

    /**
     * 排序点击事件
     */

    //用户名 省份排序点击事件
    $("#table_userName").click(function(e) {
        if (table_province_status != 0) {
            $("#table_province img").attr("src", "images/表头-可排序.png");
            table_province_status = 0;
            $("#table_province").removeClass("select");
        }
        if (table_userName_status == 0) {
            $("#table_userName img").attr("src", "images/排序箭头上.png");
            table_userName_status = 1;
            doQuery();
        } else if (table_userName_status == 1) {
            $("#table_userName img").attr("src", "images/排序箭头下.png");
            table_userName_status = 2;
            doQuery();
        } else {
            $("#table_userName img").attr("src", "images/表头-可排序.png");
            table_userName_status = 0;
            $(this).removeClass("select");
            doQuery();
        }
        if (table_userName_status != 0) {
            $(this).addClass("select");
        }
    });

    $("#table_province").click(function(e) {
        if (table_userName_status != 0) {
            $("#table_userName img").attr("src", "images/表头-可排序.png");
            table_userName_status = 0;
            $("#table_userName").removeClass("select");
        };
        if (table_province_status == 0) {
            $("#table_province img").attr("src", "images/排序箭头上.png");
            table_province_status = 1;
            doQuery();
        } else if (table_province_status == 1) {
            $("#table_province img").attr("src", "images/排序箭头下.png");
            table_province_status = 2;
            doQuery();
        } else {
            $("#table_province img").attr("src", "images/表头-可排序.png");
            table_province_status = 0;
            $(this).removeClass("select");
            doQuery();
        }
        if (table_province_status != 0) {
            $(this).addClass("select");
        }
    });

    //查询函数
    function doQuery() {
        //查询条件信息
        var userName = $("#userName").val();
        var chrName = $("#chrName").val();
        var email = $("#email").val();
        var provinceName = $("#province").val();
        //页码
        var page_size = $("#page_size").find("option:selected").text();
        var page_num = $("#page_num").text();
        //排序信息
        var sort;
        var sort_order;
        if (table_userName_status != 0) {
            sort = "userName";
            if (table_userName_status == 1) {
                sort_order = "desc";
            } else if (table_userName_status == 2) {
                sort_order = "";
            }
        } else if (table_province_status != 0) {
            sort = "provinceName";
            if (table_province_status == 1) {
                sort_order = "desc";
            } else if (table_province_status == 2) {
                sort_order = "";
            }
        } else {
            sort = "";
            sort_order = "";
        }


        var query_params = {
            "userName": userName,
            "chrName": chrName,
            "email": email,
            "provinceName": provinceName
        };
        var page_params = {
            "page_size": page_size,
            "page_num": page_num,
            "sort": sort,
            "sort_order": sort_order
        };

        //发送ajax请求
        $.ajax({
            type: "post",
            url: "searchUser.do",
            data: {
                "query_params": JSON.stringify(query_params),
                "page_params": JSON.stringify(page_params)
            },
            dataType: "json",
            success: function(response) {
                var users = response.users;
                var total = response.total;
                var total_page = Math.ceil(total / page_size);
                $("#total_page").text(total_page);
                $("#total_data").text(total);
                $("tbody").empty();
                if (users.length != 0) {
                    $("#page_num").text(1);
                }
                $.each(users, function(index, user) {
                    var s = JSON.stringify(user);
                    var str = "<tr data='" + s + "'>";
                    str = str + "<td><input type='checkbox' value='" + user.userName + "'/></td>";
                    str = str + "<td>" + user.userName + "</td>";
                    str = str + "<td>" + user.chrName + "</td>";
                    str = str + "<td>" + user.email + "</td>";
                    str = str + "<td>" + user.provinceName + "</td>";
                    str = str + "<td>" + user.cityName + "</td>";
                    str = str + "<td><a href='#' id='delbtn' value='" + user.userName + "'>删除</a>&nbsp;&nbsp;";
                    str = str + "<a href='#' id='updatebtn' value='" + user.userName + "'>修改</a></td>";
                    str = str + "</tr>";
                    $("tbody").append(str);
                });
                $('tbody tr:even').attr("class", "tr_even");
                $('tbody tr:odd').attr("class", "tr_odd");
            }
        });
    }

});

//省份改变函数
function provinceChange() {
    $("#pop_window_city").empty();
    $("#pop_window_city").append($("<option>").val("0").text("-请选择-"));
    var provinceId = $("#pop_window_province").val();
    $.ajax({
        type: "POST",
        url: "getArea.do",
        data: { provinceId: provinceId },
        dataType: "json",
        success: function(response) {
            for (index = 0; index < response.length; index++) {
                var option = $("<option>").val(response[index].cityId).text(response[index].cityName);
                $("#pop_window_city").append(option);
            }
        }
    });
}
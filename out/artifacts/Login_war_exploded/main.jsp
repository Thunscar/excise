<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="vo.User" %>
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
    <title>WEB应用开发</title>
    <link rel="stylesheet" href="css/main.css" />
    <link rel="stylesheet" href="css/download.css" />
    <link rel="stylesheet" href="css/resource_controller.css" />
    <script src="js/jquery-3.1.1.min.js"></script>
    <script src="js/main.js "></script>
	<script src="js/resource_controller.js"></script>
</head>

<body>
    <!--标题div-->
    <div id="titleDiv">
        <div id="title">WEB应用开发</div>
        <div id="showSelectUnit">
            <div id="showSelectName">首页</div>
            <div id="showSelectLine"></div>
        </div>
        <div id="userOperator">
            <div id="downloadInfo">
                <img id="downloadImage" src="images/下载.png" />
                <a id="downloadHref">手机客户端下载</a>
            </div>
            <div>
                <div id="user_controller">
                    <img id="user_controller_icon" src="images/img.jpg" />
                    <div id="user_controller_opera">
                        <span>${User.chrName}</span>
                        <img id="user_controller_opera_list" src="images/向下箭头.png">
                    </div>
                </div>
                <div id="user_opera_window">
                    <div id="user_opera_window_unit1" class="user_opera_window_unit">账号管理</div>
                    <div id="user_opera_window_unit2" class="user_opera_window_unit">切换单位</div>
                    <div id="user_opera_window_unit3" class="user_opera_window_unit">退出账号</div>
                </div>
            </div>
        </div>
    </div>

    <!--菜单栏div-->
    <div id="menuDiv">
        <div id="userMenu">
            <img src="images/img.jpg" class="userImage" />
            <div class="userName">
                ${User.chrName}
            </div>
        </div>

        <div id="choiceMenu">
            <div class="choiceUnit" id="unit1">
                <div class="unitFont ">首页</div>
                <img src="images/箭头.png " class="image " id="unitImage1">
            </div>

            <div class="choiceUnit " id="unit2">
                <div class="unitFont ">资源下载</div>
                <img src="images/箭头.png " class="image " id="unitImage2">
            </div>

            <div class="choiceUnit" id="unit3">
                <div class="unitFont ">资源管理</div>
                <img src="images/箭头.png " class="image " id="unitImage3">
            </div>

            <div class="choiceUnit " id="unit4">
                <div class="unitFont ">用户管理</div>
                <img src="images/箭头.png " class="image " id="unitImage4">
            </div>

            <div class="choiceUnit" id="unit5">
                <div class="unitFont ">个人中心</div>
                <img src="images/箭头.png " class="image " id="unitImage5">
            </div>

        </div>
    </div>

    <!--内容界面div-->
    <div id="contentDiv">

        <div id="unit1Content">
            首页
        </div>

        <div id="unit2Content">
        </div>

        <div id="unit3Content">
        <div id="unit3Content_info"></div>
            <div id="resource_controller_content">资源管理页面
            </div>
        </div>

        <div id="unit4Content">
            <div id="unit4Content_info"></div>
           <div id="user_controller_content">
                <div id="user_controller_search">
                    <div id="input_div">
                        <input class="input" type="text" placeholder="输入用户名" id="userName" autocomplete="new-userName">
                        <input class="input" type="text" placeholder="输入姓名" id="chrName" autocomplete="new-chrName">
                        <input class="input" type="text" placeholder="请输入邮箱" id="email" autocomplete="new-email">
                        <input class="input" type="text" placeholder="请输入省份" id="province" autocomplete="new-province">
                    </div>
                    <div id="opera_div">
                        <a class="btn" id="search_btn">查找</a>
                        <a class="btn" id="clean_btn">清空</a>
                        <a class="btn" id="insert_btn">增加</a>
                        <a class="btn" id="delete_btn">删除</a>
                        <a class="btn" id="update_btn">修改</a>
                    </div>
                </div>
                <div id="user_controller_table">
                    <table border="1" cellspacing="0">
                        <thead>
                            <tr>
                                <th width="100px"><input type="checkbox" title="选择" id="all_checkbox">&nbsp;全选</th>
                                <th width="200px" id="table_userName">
                                    用户名
                                    <img align=right src="images/表头-可排序.png">
                                </th>
                                <th width="200px">中文名</th>
                                <th width="200px">邮箱</th>
                                <th width="100px" id="table_province">
                                    省份
                                    <img align=right src="images/表头-可排序.png">
                                </th>
                                <th width="100px">城市</th>
                                <th width="100px">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
                <div id="user_controller_page">
                    <div id="paging">
                        <span>每页</span>
                        <select id="page_size">
                        <option>5</option>
                        <option selected>10</option>
                        <option>20</option>
                        </select>
                        <span>&nbsp;共</span>
                        <span id="total_data">0</span>
                        <span>条数据&nbsp;</span>
                        <span id="page_num">1</span>
                        <span>页/</span>
                        <span id="total_page">1</span>
                        <span>页</span>
                    </div>
                    <div id="pageNav">
                        <span id="first_page">首页</span>
                        <span id="last_page">上一页</span>
                        <span id="next_page">下一页</span>
                        <span id="final_page">尾页</span>
                    </div>
                </div>
            </div>
            
        </div>

        <div id="unit5Content">个人中心
        </div>
    </div>

    <div id="pop_window">

    </div>
    <div id="pop_window_input">
        <p id="pop_window_title">注册</p>
        <label for="userName"></label>
        <input type="text" id="pop_window_userName" class="_input" placeholder="用户名" onblur="userNameOnblur()" autocomplete="new-pop_window_userName">
        <br><small class="errorInfo" id="userNameErrorInfo">errorInfo</small><br>

        <label for="chrName"></label>
        <input type="text" id="pop_window_chrName" class="_input" placeholder="中文名" onblur="chrNameOnblur()" autocomplete="new-pop_window_chrName">
        <br><small class="errorInfo" id="chrNameErrorInfo">errorInfo</small><br>

        <label for="email"></label>
        <input type="text" id="pop_window_email" class="_input" placeholder="邮箱" onblur="emailOnblur()" autocomplete="new-pop_window_email">
        <br><small class="errorInfo" id="emailErrorInfo">errorInfo</small><br>

        <p>请选择地区</p>
        <select id="pop_window_province" class="area_select">
                    <option value="0" >-请选择省份-</option>
                </select>
        <select id="pop_window_city" class="area_select">
                    <option value="0">-请选择城市-</option>
                </select>
        <br><small class="errorInfo" id="areaErrorInfo">errorInfo</small><br>

        <label for="password"></label>
        <input type="password" id="pop_window_password" class="_input" placeholder="密码" onblur="passwordOnblur()" autocomplete="new-password">
        <br><small class="errorInfo" id="passwordErrorInfo">errorInfo</small><br>

        <label for="enterPassword"></label>
        <input type="password" id="pop_window_enterPassword" class="_input" placeholder="确认密码" onblur="enterPasswordOnblur()" autocomplete="new-pop_window_enterPassword">
        <br><small class="errorInfo" id="enterPasswordErrorInfo">errorInfo</small><br>

        <input id="operaButton" type="button" value="" class="registerButton">
        <br><small class="errorInfo" id="registerErrorInfo">errorInfo</small><br>
        <input id="closeButton" type="button" value="点击关闭" class="registerButton">
    </div>
</body>

</html>
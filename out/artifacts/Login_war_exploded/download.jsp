<%@ page import="java.util.Date" %>
<%@ page import="javax.xml.crypto.Data" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Thunscar
  Date: 2020/9/21
  Time: 17:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Download</title>
    <style type="text/css">@import "css/download.css";</style>
    <style type="text/css">@import "css/main.css";</style>
    <link href="css/download.css" rel="stylesheet" type="text/css">



</head>
<body >
	<!-- 头部-->
	<div class="headDiv">
		<b>
			<font color="#000000" size=10>
		        Download List
            </font>
			<a class="dim"></a>
			<a class="dim"></a>
			<a class="dim"></a>
        </b>
	</div>
	<!-- 下部-->
	<div class="bodyDiv">
    	<div class="divLine"></div>
			<div >
				<c:forEach items="${DownloadList}" var="download" varStatus="downloadvst">
					<div class="downloadUtilDiv">
						<div class="dIcon"><img src="${download.image}" class="imageIcon" align="center"></div>
						<div class="dName" >
							<i>${download.name}</i>

							<div id="starContainer" class="starContainer" >
								大小：${download.size}&nbsp;
								星级:
								<i class="star">
									<span style="width: ${download.star/5*100}%;"></span>
								</i>

							</div>
							</div>

						</div>
						<div class="dDesc">${download.description}</div>
						<div class="dDown"><a href="download.do?id=${download.id}" class="downButton">立即下载</a></div>
					</div>
   		  		</c:forEach>

		  		
			</div>
	</div>

	<script src="js/download.js"></script>
</body>
</html>

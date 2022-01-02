<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="cpath">${ pageContext.request.contextPath }</c:set>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link type="text/css" rel="stylesheet" href="${ cpath }/resources/css/style.css">
</head>
<body>
<script src="https://cdn.jsdelivr.net/sockjs/1/sockjs.min.js"></script>
<script src="${ cpath }/resources/js/chat.js"></script>

<c:if test="${ empty username }">
	<c:redirect url="/"/>
</c:if>

<h2>채팅</h2>
<hr>

<h3> username : ${ username }</h3>

<div id="textarea"></div>
<div class="bottom">
	<input id="send" name="send" autofocus>
	<input id="btn" type="button" value="전송">
	<a href="${ cpath }/logout"><input type="button" value="나가기"></a>
</div>

<script>
	const cpath = '${ cpath }'
	const username = '${ username }'
	const btn = document.getElementById('btn')
	const send = document.querySelector('input[name="send"]')
	const textarea = document.getElementById('textarea')
	
	console.log(btn)
	console.log(send)
	console.log(textarea)
	
	const ws = new SockJS(cpath + '/chat')
	
	ws.onmessage = onMessage
	ws.onopen = onOpen				// 웹 소켓이 열리면 입장 메시지를 출력하기
	ws.onclose = function(msg){}	//
	ws.onerror = function(msg){}	// 
	
	btn.onclick = sendHandler		// 버튼 클릭이하면 보내는 함수
	send.onkeydown = keyHandler		// 키 입력하면 조건에 따라 보내느 함수로 연결
</script>
</body>
</html>
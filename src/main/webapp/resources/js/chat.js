function onMessage(event){		// 메시지를 받으면 수행하는 함수
	
	let className = ''
	
	if(JSON.parse(event.data).username == 'alarm'){
		className = 'alarm'
	}
	else if(JSON.parse(event.data).username == username){
		className = 'self'
	}
	else{
		className = 'other'
	}
	
	const div = document.createElement('div')
	const name = document.createElement('div')
	const message = document.createElement('span')
	div.className = className
	name.className = 'name'
	name.innerText = JSON.parse(event.data).username
	message.className = 'message'
	message.innerText = JSON.parse(event.data).message
	
	div.appendChild(name)
	div.appendChild(message)
	textarea.appendChild(div)
	
		// 메시지가 길어지면 자동으로 아래로 스크롤
	textarea.scroll({
		top : textarea.scrollHeight,
		behavior : 'smooth'
	})
}


function onOpen(){
	const payload = {
			username : 'alarm',
			message : username + '님이 입장하셨습니다'
	}
//	const div = document.createElement('div')
//	div.innerText = username + '님이 입장하셨습니다'
//	textarea.appendChild(div)
	
	// payload를 stringify해서 JSON형식의 문자열로 send한다
	ws.send(JSON.stringify(payload))
}

function onClose(event){
//	const payload = {
//			username : 'alarm',
//			message : username + '님이 나가셨습니다'
//	}
//	ws.send(JSON.stringify(payload))

	// 미리 메시지를 보내고 로그아웃을 하게 만든다
	// 나가기 전에 미리 메시지를 보내는 것이다
}

function quitHandler(event){
	const payload = {
			username : 'alarm',
			message : username + '님이 나가셨습니다'
	}
	ws.send(JSON.stringify(payload))
	
	ws.close()		// 나가기 버튼 클릭하면 웹소켓을 닫도록 함수를 호출한다
	
	location.href = cpath + '/logout'
}

function keyHandler(event){
	if(event.key == 'Enter'){
		// 입력한 키가 엔터키면 보내는 함수
		sendHandler(event)
	}
}

function sendHandler(event){
	const message = send.value
	send.value = ''
		
	// 입력받을 값
	const payload = {
			username : username,
			message : message
	}
	ws.send(JSON.stringify(payload))
	send.focus()
}
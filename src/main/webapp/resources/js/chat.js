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
//	const payload = {
//			username : 'alarm',
//			message : username + '님이 입장하셨습니다'
//	}
	const div = document.createElement('div')
	div.innerText = username + '님이 입장하셨습니다'
	textarea.appendChild(div)
}

function onclose(){
	
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
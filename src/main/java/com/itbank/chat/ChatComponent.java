package com.itbank.chat;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component	
public class ChatComponent extends TextWebSocketHandler {
	// WebSocket 서버를 생성하는 것은 WebSocketHandler를 구현한다
	// spring에서 제공하는 TextWebSocketHandler를 상속받아서 확장하는 것이 좋다
	// 접속 / 메시지 전송 / 퇴장 메서드
	
	// socket 통신 : 지속적인 통신을 위해서 데이터를 송/수신할 수 있는 연결통로를 생성 후 통신할 수 있다
	// WebSocket을 이용하면 실시간 채팅, 실시간 거래 상황, 인기 검색어, 쪽지기능 구현 가능
	
	// 클라이언트에서 서버로 메시지를 전달할 때 기본 문자열이 아니라 
	// JSON 형태의 문자열을 만들어서 전달
	private List<WebSocketSession> sessionList = new ArrayList<WebSocketSession>();
	
	
	
	@Override	// 연결이 성립되면(접속이 유지되면) 호출되는 함수
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("TextWebSocketHandler 연결 생성");
		sessionList.add(session);
		// sessionList에 session을 담는다
	}
	
	@Override		// 메시지 수신 후 실행 메서드  // 메시지를 받으면 서버가 수행하는 메서드
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("TextWebSocketHandler 메시지 수신");
		
		// 자바스크립트가 전송한 메시지 내용
		System.out.println(message.getPayload());
		
		// 상대방 ip주소 찍어내기
		System.out.println(session.getRemoteAddress());
		
		// 보내는 과정
		for(WebSocketSession wss : sessionList) {
			wss.sendMessage(new TextMessage(message.getPayload()));
		}
	}
	
	@Override		// 연결이 종료되면 수행되는 메서드 -> 나가면 해당 세션을 날려준다
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("세션 해제");
		
		sessionList.remove(session);
	}
}

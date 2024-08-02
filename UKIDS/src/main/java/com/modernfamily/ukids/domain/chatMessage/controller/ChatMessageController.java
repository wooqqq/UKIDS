package com.modernfamily.ukids.domain.chatMessage.controller;

import com.modernfamily.ukids.domain.chatMessage.entity.ChatMessage;
import com.modernfamily.ukids.domain.chatMessage.model.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    /*
     채팅 메시지 전송 및 저장
     클라이언트가 SEND 할 수 있는 경로
     WebSocketConfig에서 등록한 applicationDestinationPrfixes와 @MessageMapping의 경로가 합쳐진다.
    */
//    @MessageMapping("/chat/message")
////    @SendTo("/topic/messages")
//    public void sendMessage(@Payload ChatMessage chatMessage) {
//        // 메시지를 WebSocket을 통해 전송하고, 동시에 Redis에 저장
////        chatMessageService.sendChatMessage(chatMessage);
//    }
}

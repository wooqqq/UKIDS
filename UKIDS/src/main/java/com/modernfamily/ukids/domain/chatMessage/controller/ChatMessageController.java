package com.modernfamily.ukids.domain.chatMessage.controller;

import com.modernfamily.ukids.domain.chatMessage.entity.ChatMessage;
import com.modernfamily.ukids.domain.chatMessage.model.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    // 채팅 메시지 전송 및 저장
    @MessageMapping("/message")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        // 메시지를 WebSocket을 통해 전송하고, 동시에 Redis에 저장
        chatMessageService.sendChatMessage(chatMessage);
    }
}

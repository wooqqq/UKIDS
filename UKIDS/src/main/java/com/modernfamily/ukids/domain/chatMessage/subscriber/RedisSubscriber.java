package com.modernfamily.ukids.domain.chatMessage.subscriber;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.modernfamily.ukids.domain.chatMessage.entity.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisSubscriber {

//    private final SimpMessageSendingOperations messagingTemplate;

    public void sendMessage(String publishMessage) {
//        try {
//            ObjectMapper objectMapper = new ObjectMapper();
//            ChatMessage chatMessage = objectMapper.readValue(publishMessage, ChatMessage.class);
////            messagingTemplate.convertAndSendToUser("/sub/chatroom/" + chatMessage.getChatRoomId(), chatMessage);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
    }
}

package com.modernfamily.ukids.domain.chatMessage.model.service;

import com.modernfamily.ukids.domain.chatMessage.entity.ChatMessage;
import com.modernfamily.ukids.domain.chatMessage.model.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessageSendingOperations messagingTemplate;

    // 채팅 메시지 저장
    public void saveChatMessage(ChatMessage chatMessage) {
        chatMessageRepository.saveChatMessage(chatMessage.getChatRoomId().toString(), chatMessage);
    }

    // 채팅 메시지 전송
    public void sendChatMessage(ChatMessage chatMessage) {
        // 메시지 전송
        messagingTemplate.convertAndSend("/sub/chatroom/" + chatMessage.getChatRoomId().toString(), chatMessage);

        // 메시지 저장
        saveChatMessage(chatMessage);
    }


}

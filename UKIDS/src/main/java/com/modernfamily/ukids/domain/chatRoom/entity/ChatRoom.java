package com.modernfamily.ukids.domain.chatRoom.entity;

import com.modernfamily.ukids.domain.chatMessage.entity.ChatMessage;
import com.modernfamily.ukids.domain.chatMessage.entity.ChatMessageType;
import com.modernfamily.ukids.domain.chatRoom.model.service.ChatService;
import com.modernfamily.ukids.domain.family.entity.Family;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
public class ChatRoom {

    @Id
    private Long chatRoomId;

    private String chatRoomName;

    private Long familyId;

    @OneToOne
    private Family family;

    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public ChatRoom(Long chatRoomId, String chatRoomName, Long familyId, Family family) {
        this.chatRoomId = chatRoomId;
        this.chatRoomName = chatRoomName;
        this.familyId = familyId;
        this.family = family;
    }

    public void handleActions(WebSocketSession session, ChatMessage chatMessage, ChatService chatService) {
        if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
            sessions.add(session);
            chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다.");
        }
        sendMessage(chatMessage, chatService);
    }

    public <T> void sendMessage(T message, ChatService chatService) {
        sessions.parallelStream().forEach(session -> chatService.sendMessage(session, message));
    }

}

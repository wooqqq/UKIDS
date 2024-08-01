package com.modernfamily.ukids.domain.chatMessage.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ChatMessage {

    @Id
    private Long chatMessageId;

    private String content;

    private Long senderId;
    private String senderName;
    private String senderAvatar;

    private Long chatRoomId;
    private String chatId;

    private LocalDateTime createTime;

    @Enumerated(EnumType.STRING)
    private ChatMessageType type;
}

package com.modernfamily.ukids.domain.chatMessage.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ChatMessage {

    public enum MessageType {
        ENTER, TALK
    }

    private MessageType type;
    private String roomId;
    private String sender;
    private String message;

//    @Id
//    private Long chatMessageId;
//
//    private String content;
//
//    @Setter
//    private String message;
//
//    private Long senderId;
//    private String senderName;
////    private String senderProfile;
//
//    private Long chatRoomId;
//
//    private LocalDateTime createTime;
//
//    @Enumerated(EnumType.STRING)
//    private ChatMessageType type;
}

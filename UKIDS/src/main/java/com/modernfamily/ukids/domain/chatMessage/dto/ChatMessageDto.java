package com.modernfamily.ukids.domain.chatMessage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ChatMessageDto {

    private Long chatMessageId;
    private String content;
    private Long senderId;
    private String senderName;
    private String senderProfile;
    private Long chatRoomId;
    private LocalDateTime createTime;
    private String type;
}

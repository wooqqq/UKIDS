package com.modernfamily.ukids.domain.chatRoom.dto;

import com.modernfamily.ukids.domain.family.entity.Family;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomDto {

    private Long chatRoomId;
    private String chatRoomName;
    private Family family;
    private Long familyId;
}

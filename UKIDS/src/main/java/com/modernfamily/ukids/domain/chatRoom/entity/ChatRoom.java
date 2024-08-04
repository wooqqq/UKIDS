package com.modernfamily.ukids.domain.chatRoom.entity;

import com.modernfamily.ukids.domain.family.entity.Family;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;

@Getter
public class ChatRoom {

    @Id
    private Long chatRoomId;

    private String chatRoomName;

    private Long familyId;

    @OneToOne
    private Family family;

    public ChatRoom() {}

    public static ChatRoom create(Long chatRoomId, String chatRoomName, Long familyId, Family family) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.chatRoomId = chatRoomId;
        chatRoom.chatRoomName = chatRoomName;
        chatRoom.familyId = familyId;
        chatRoom.family = family;
        return chatRoom;
    }

//    @Builder
//    public ChatRoom(Long chatRoomId, String chatRoomName, Long familyId, Family family) {
//        this.chatRoomId = chatRoomId;
//        this.chatRoomName = chatRoomName;
//        this.familyId = familyId;
//        this.family = family;
//    }

}

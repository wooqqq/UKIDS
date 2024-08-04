package com.modernfamily.ukids.domain.chatRoom.model.repository;

import com.modernfamily.ukids.domain.chatRoom.dto.ChatRoomDto;
import com.modernfamily.ukids.domain.chatRoom.entity.ChatRoom;
import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.family.model.repository.FamilyRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@RequiredArgsConstructor
public class ChatRoomRepository {

    private Map<Long, ChatRoom> chatRoomMap;
    private final FamilyRepository familyRepository;

    @PostConstruct
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }

    public List<ChatRoom> findAllRoom() {
        // 채팅방 생성순서 최근 순으로 반환
        List chatRooms = new ArrayList<>(chatRoomMap.values());
        Collections.reverse(chatRooms);
        return chatRooms;
    }

    public ChatRoom findRoomById(Long id) {
        return chatRoomMap.get(id);
    }

    public ChatRoom createChatRoom(Long familyId) {
        Family family = familyRepository.findById(familyId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        ChatRoom chatRoom = ChatRoom.create(familyId, family.getName(), familyId, family);
        chatRoomMap.put(chatRoom.getChatRoomId(), chatRoom);
        return chatRoom;
    }
}

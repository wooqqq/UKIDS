package com.modernfamily.ukids.domain.chatRoom.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.modernfamily.ukids.domain.chatRoom.entity.ChatRoom;
import com.modernfamily.ukids.domain.family.model.repository.FamilyRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {

    private final ObjectMapper objectMapper;
    private Map<Long, ChatRoom> chatRooms;

    private final FamilyRepository familyRepository;

    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }

    public List<ChatRoom> findAllRoom() {
        return new ArrayList<>(chatRooms.values());
    }

    public ChatRoom findRoomById(Long chatRoomId) {
        return chatRooms.get(chatRoomId);
    }

//    public ChatRoom createRoom(ChatRoomDto chatRoomDto) {
//        Long familyId = chatRoomDto.getFamilyId();
//
//        Family family = familyRepository.findById(familyId)
//                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));
//
//        ChatRoom chatRoom = ChatRoom.builder()
//                .chatRoomId(familyId)
//                .chatRoomName(family.getName())
//                .familyId(familyId)
//                .family(family)
//                .build();
//        chatRooms.put(chatRoom.getChatRoomId(), chatRoom);
//        return chatRoom;
//    }
//
//    public <T> void sendMessage(WebSocketSession session, T message) {
//        try {
//            System.out.println(message);
//            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
//        } catch (IOException e) {
//            log.error(e.getMessage(), e);
//        }
//    }
}

package com.modernfamily.ukids.domain.chatRoom.controller;

import com.modernfamily.ukids.domain.chatRoom.dto.ChatRoomDto;
import com.modernfamily.ukids.domain.chatRoom.entity.ChatRoom;
import com.modernfamily.ukids.domain.chatRoom.model.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ChatRoom createChatRoom(@RequestBody ChatRoomDto chatRoomDto) {
        return chatService.createRoom(chatRoomDto);
    }

    @GetMapping("/{id}")
    public ChatRoom findChatRoom(@PathVariable Long chatRoomId) {
        return chatService.findRoomById(chatRoomId);
    }

}

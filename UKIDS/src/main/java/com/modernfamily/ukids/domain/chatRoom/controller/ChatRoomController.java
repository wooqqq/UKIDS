package com.modernfamily.ukids.domain.chatRoom.controller;

import com.modernfamily.ukids.domain.chatMessage.entity.ChatMessage;
import com.modernfamily.ukids.domain.chatRoom.entity.ChatRoom;
import com.modernfamily.ukids.domain.chatRoom.model.repository.ChatRoomRepository;
import com.modernfamily.ukids.domain.chatRoom.model.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatService chatService;

    // 채팅 리스트 화면
    @GetMapping("/room")
    public String rooms(Model model) {
        System.out.println("/room 들어옴");
        return "chat/room";
    }

    // 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> room() {
        return chatRoomRepository.findAllRoom();
    }

    // 채팅방 생성
    @PostMapping("/room")
    @ResponseBody
    public ChatRoom createRoom(@RequestBody Map<String, Long> payload) {
        Long familyId = payload.get("familyId");
        return chatRoomRepository.createChatRoom(familyId);
    }

    // 채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable("roomId") Long roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }

    // 특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable("roomId") Long roomId) {
        return chatRoomRepository.findRoomById(roomId);
    }

    @RequestMapping(value = "/room/{roomId}/messages", method = RequestMethod.GET)
    @ResponseBody
    public List<ChatMessage> getChatMessages(@PathVariable("roomId") Long roomId) {
        try {
            return chatService.getChatMessages(roomId.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

}

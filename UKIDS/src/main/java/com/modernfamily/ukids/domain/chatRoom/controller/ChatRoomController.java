package com.modernfamily.ukids.domain.chatRoom.controller;

import com.modernfamily.ukids.domain.chatMessage.entity.ChatMessage;
import com.modernfamily.ukids.domain.chatRoom.entity.ChatRoom;
import com.modernfamily.ukids.domain.chatMessage.model.service.ChatService;
import com.modernfamily.ukids.domain.chatRoom.model.service.ChatRoomService;
import com.modernfamily.ukids.domain.family.entity.Family;
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

    private final ChatRoomService chatRoomService;
    private final ChatService chatService;

    // 채팅 리스트 화면
    @GetMapping("/room")
    public String rooms(Model model) {
        return "chat/room";
    }

    // 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> room() {
        return chatRoomService.findAllRoom();
    }

    // 채팅방 생성
    @PostMapping("/room")
    @ResponseBody
    public ChatRoom createRoom(@RequestBody Map<String, Long> payload) {
        Long familyId = payload.get("familyId");
        return chatRoomService.createFamilyChatRoom(familyId);
    }

    // 채팅방 입장 화면
    @GetMapping("/room/enter/{id}")
    public String roomDetail(Model model, @PathVariable("id") Long familyId) {
        // 로그인한 유저가 해당 roomId(familyId)의 멤버인지 확인하는 코드
        Family family = chatRoomService.validateFamilyMember(familyId);

        model.addAttribute("roomId", family.getFamilyId());
        return "/chat/roomdetail";
    }

    // 특정 채팅방 조회
    @GetMapping("/room/{id}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable("id") Long roomId) {
        return chatRoomService.findRoomByRoomId(roomId);
    }

    @RequestMapping(value = "/room/{id}/messages", method = RequestMethod.GET)
    @ResponseBody
    public List<ChatMessage> getChatMessages(@PathVariable("id") Long roomId) {
        try {
            return chatService.getChatMessages(roomId.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

}

package com.modernfamily.ukids.domain.chatMessage.controller;

import com.modernfamily.ukids.domain.chatMessage.entity.ChatMessage;
import com.modernfamily.ukids.domain.chatMessage.pubsub.RedisPublisher;
import com.modernfamily.ukids.domain.chatRoom.model.repository.ChatRoomRepository;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.domain.user.entity.User;
import com.modernfamily.ukids.domain.user.model.repository.UserRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

// Publisher 구현
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        String userId = CustomUserDetails.contextGetUserId();

        User loginUser = userRepository.findById(userId)
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION));

        message.setSenderId(loginUser.getUserId());
        message.setSender(loginUser.getName());

        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            chatRoomRepository.enterChatRoom(message.getRoomId());
//            message.setMessage(message.getSender() + " 님이 입장하셨습니다.");
        } else {
            // WebSocket에 발행된 메시지를 redis로 발행한다
            redisPublisher.publish(chatRoomRepository.getTopic(message.getRoomId()), message);
        }
    }

    /**
     * websocket "/pub/chat/leave"로 들어오는 채팅방 나가기 메시징을 처리한다.
     */
    @MessageMapping("/chat/leave")
    public void leave(ChatMessage message) {
        if (ChatMessage.MessageType.EXIT.equals(message.getType())) {
            chatRoomRepository.exitChatRoom(message.getRoomId());
        }
    }
}

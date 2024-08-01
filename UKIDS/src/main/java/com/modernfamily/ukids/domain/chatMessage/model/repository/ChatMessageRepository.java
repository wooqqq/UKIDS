package com.modernfamily.ukids.domain.chatMessage.model.repository;

import com.modernfamily.ukids.domain.chatMessage.entity.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ChatMessageRepository {

    private final RedisTemplate<String, Object> redisTemplate;

    private static final String CHAT_MESSAGE_KEY = "CHAT_MESSAGE";

    // 채팅 메시지 저장
    public void saveChatMessage(String chatRoomId, ChatMessage chatMessage) {
        redisTemplate.opsForList().rightPush(CHAT_MESSAGE_KEY + ":" + chatRoomId, chatMessage);
    }

    // 특정 채팅방의 메시지 가져오기


    // 특정 채팅방의 모든 메시지 삭제

}

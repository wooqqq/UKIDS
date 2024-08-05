package com.modernfamily.ukids.domain.chatRoom.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.modernfamily.ukids.domain.chatMessage.entity.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    public List<ChatMessage> getChatMessages(String roomId) throws Exception {
        String key = "chat:messages:" + roomId;
        System.out.println("여기 ChatService key : " + key);
        List<Object> rawMessages = redisTemplate.opsForList().range(key, 0, -1);
        System.out.println("여기는 ChatService : " + rawMessages);
        return rawMessages.stream()
                .map(message -> {
                    try {
                        return objectMapper.readValue((String) message, ChatMessage.class);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());
    }

}

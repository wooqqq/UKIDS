package com.modernfamily.ukids.global.handler;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class StompHandler implements ChannelInterceptor {

    private final FamilyMemberRepository familyMemberRepository;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        // 토큰 인증 및 메시지 유효성 검사 등을 여기서 처리 가능
        return message;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        // 사용자 ID 가져오기
        String userId = headerAccessor.getUser() != null ? headerAccessor.getUser().getName() : null;

        log.info("WebSocket 연결 정보: {}", headerAccessor.getMessageHeaders());
        log.info("WebSocket 연결 유저: {}", userId);
    }
}

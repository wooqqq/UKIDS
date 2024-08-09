package com.modernfamily.ukids.global.handler;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.familyMember.entity.FamilyMember;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import com.modernfamily.ukids.global.jwt.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE + 99)  // Spring security보다 우선순위를 높여야 함
public class StompHandler implements ChannelInterceptor {

    private final JWTUtil jwtUtil;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        // 커스텀 헤더 접근용 -> JWT 가져오기
        StompHeaderAccessor accessor = StompHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        assert accessor != null;
        if(accessor.getCommand() == StompCommand.CONNECT) {
            String token = String.valueOf(accessor.getNativeHeader("Authorization").get(0));
            token = token.replace("Bearer ", "");
            if(jwtUtil.isExpired(token))
                throw new ExceptionResponse(CustomException.EXPIRED_JWT_EXCEPTION);

            String userId = jwtUtil.getId(token);

            accessor.addNativeHeader("User", userId);

        }

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

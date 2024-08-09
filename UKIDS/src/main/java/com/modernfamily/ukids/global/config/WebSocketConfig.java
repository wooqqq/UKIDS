package com.modernfamily.ukids.global.config;

import com.modernfamily.ukids.global.handler.StompHandler;
import com.modernfamily.ukids.global.jwt.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.*;
import sun.misc.SignalHandler;

@Configuration
@EnableWebSocketMessageBroker // 메시지 브로커가 지원하는 WebSocket 메시지 처리를 활성화
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JWTUtil jwtUtil;

    // HandShake 와 통신을 담당할 EndPoint 지정
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp")
                .setAllowedOriginPatterns("*")
                .withSockJS();
        registry.addEndpoint("/ws-stomp")
                .setAllowedOriginPatterns("*");
    }

    // 메모리 기반의 Simple Message Broker 활성화
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 메시지 브로커가 Subscriber들에게 메시지를 전달할 URL 지정 (메시지 구독 요청)
        config.enableSimpleBroker("/sub", "/topic");
        // 클라이언트가 서버로 메시지 보낼 URL 접두사 지정 (메시지 발행 요청)
        config.setApplicationDestinationPrefixes("/pub", "/app");
    }
    
    // STOMP 연결 시, 호출
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new StompHandler(jwtUtil));
    }

}

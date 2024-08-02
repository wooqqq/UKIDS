package com.modernfamily.ukids.global.config;

import com.modernfamily.ukids.global.handler.StompHandler;
import com.modernfamily.ukids.global.handler.WebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
//@EnableWebSocketMessageBroker // 메시지 브로커가 지원하는 WebSocket 메시지 처리를 활성화
@RequiredArgsConstructor
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketHandler webSocketHandler;
    private final StompHandler stompHandler;

    // HandShake 와 통신을 담당할 EndPoint 지정
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // WebSocket 연결 시 요청을 보낼 EndPoint 지정
//        registry.addEndpoint("/ws-stomp")
//                .setAllowedOriginPatterns("*")
//                .withSockJS();
//        registry.addEndpoint("/ws-stomp")
//                .setAllowedOriginPatterns("*");
        registry.addHandler(webSocketHandler, "/ws/chat")
                .setAllowedOrigins("*");
    }

    // 메모리 기반의 Simple Message Broker 활성화
//    @Override
//    public void configureMessageBroker(MessageBrokerRegistry config) {
//        System.out.println("여기도 오나?");
//        // 메시지 브로커가 Subscriber들에게 메시지를 전달할 URL 지정 (메시지 구독 요청)
//        config.enableSimpleBroker("/sub");
//        // 클라이언트가 서버로 메시지 보낼 URL 접두사 지정 (메시지 발행 요청)
//        config.setApplicationDestinationPrefixes("/pub");
//    }
//
//    @Override
//    public void configureClientInboundChannel(ChannelRegistration registration) {
//        registration.interceptors(stompHandler);
//    }
}

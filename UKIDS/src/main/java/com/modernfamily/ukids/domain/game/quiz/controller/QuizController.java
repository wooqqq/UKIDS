package com.modernfamily.ukids.domain.game.quiz.controller;

public class QuizController {

    @MessageMapping("/move")
    @SendTo("/topic/game")
    public GameState handlePlayerMove(PlayerMove move, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        System.out.println("Received move from session: " + sessionId);
        // 세션 ID를 사용하여 게임 상태를 처리하는 로직
        return new GameState();
    }
}

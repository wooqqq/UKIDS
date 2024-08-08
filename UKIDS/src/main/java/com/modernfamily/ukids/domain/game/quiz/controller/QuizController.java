package com.modernfamily.ukids.domain.game.quiz.controller;

import com.modernfamily.ukids.domain.game.gameResult.entity.GameType;
import com.modernfamily.ukids.domain.game.quiz.dto.QuizRoom;
import com.modernfamily.ukids.domain.game.quiz.model.service.QuizService;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.response.QuizQuestionRandomResponseDto;
import com.modernfamily.ukids.domain.user.entity.User;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    // 게임방 생성 -> 게임방 정보 및 connection 반환
    @MessageMapping("/enter/{id}")
    @SendTo("/topic/game/{id}")
    public Map<String, Object> enterQuizRoom(@PathVariable("id") Long familyId,
                                             @RequestParam("gameType")GameType gameType)
            throws OpenViduJavaClientException, OpenViduHttpException {
        return quizService.enterQuizRoom(familyId, gameType);
    }

    // 유저 퇴장
    @MessageMapping("/exit/{id}")
    public void exitQuizRoom(@PathVariable("id") Long familyId) {
        quizService.exitQuizRoom(familyId);
    }

    // 게임방 정보 반환
    @MessageMapping("/info/{id}")
    @SendTo("/topic/game/{id}")
    public QuizRoom getQuizRoom(@PathVariable("id") Long familyId) {
        return quizService.getQuizRoom(familyId);
    }

    // 퀴즈 개수 설정
    @MessageMapping("/quiz-count/{id}")
    @SendTo("/topic/game/{id}")
    public Map<String, Object> saveQuizCounts(@PathVariable("id") Long familyId,
                                              @RequestParam("counts")long counts) {
        return quizService.saveQuizCounts(familyId, counts);
    }

    // 준비 클릭 -> 다 준비되면 바로 게임 시작 -> 퀴즈 개수만큼 퀴즈 생성 => boolean return
    @MessageMapping("/ready/{id}")
    @SendTo("/topic/game/{id}")
    public Map<String, Object> isReadyGameStart(@PathVariable("id") Long familyId) {
        return quizService.isReadyGameStart(familyId);
    }

    // 질문 가져오기 -> 반환 끝나면 게임 종료 -> QuizQuestionRandomResponseDto or null (이건 게임 종료)
    @MessageMapping("/quiz-question/{id}")
    @SendTo("/topic/game/{id}")
    public QuizQuestionRandomResponseDto getQuizQuestion(@PathVariable("id") Long familyId) {
        return quizService.getQuizQuestion(familyId);
    }

    // 정답 확인
    @MessageMapping("/enter/{id}")
    @SendTo("/topic/game/{id}")
    public Map<String, Object> checkQuizAnswer(@PathVariable("id") Long familyId,
                                             @RequestParam("inputAnswer")String inputAnswer) {
        return quizService.checkQuizAnswer(familyId, inputAnswer);
    }
}

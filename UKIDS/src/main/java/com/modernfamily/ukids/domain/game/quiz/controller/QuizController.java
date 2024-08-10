package com.modernfamily.ukids.domain.game.quiz.controller;

import com.modernfamily.ukids.domain.game.quizResult.entity.GameType;
import com.modernfamily.ukids.domain.game.quiz.dto.QuizRoom;
import com.modernfamily.ukids.domain.game.quiz.model.service.QuizService;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.response.QuizQuestionRandomResponseDto;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    // 게임방 생성 -> 게임방 정보 및 connection 반환
    @MessageMapping("/quiz/enter/{id}")
    @SendTo("/topic/quiz/{id}")
    public Map<String, Object> enterQuizRoom(@PathVariable("id") Long familyId,
                                             @RequestParam("gameType")GameType gameType,
                                             @Header("nativeHeaders") Object header)
            throws OpenViduJavaClientException, OpenViduHttpException {
        String userId = header.toString().split("User=\\[")[1].split("]")[0];
        return quizService.enterQuizRoom(familyId, gameType, userId);
    }

    // 유저 퇴장
    @MessageMapping("/quiz/exit/{id}")
    public void exitQuizRoom(@PathVariable("id") Long familyId, @Header("nativeHeaders") Object header) {
        String userId = header.toString().split("User=\\[")[1].split("]")[0];
        quizService.exitQuizRoom(familyId, userId);
    }

    // 게임방 정보 반환
    @MessageMapping("/quiz/info/{id}")
    @SendTo("/topic/quiz/{id}")
    public QuizRoom getQuizRoom(@PathVariable("id") Long familyId) {
        return quizService.getQuizRoom(familyId);
    }

    // 퀴즈 개수 설정
    @MessageMapping("/quiz/quiz-count/{id}")
    @SendTo("/topic/quiz/{id}")
    public Map<String, Object> saveQuizCounts(@PathVariable("id") Long familyId,
                                              @RequestParam("counts")long counts) {
        return quizService.saveQuizCounts(familyId, counts);
    }

    // 준비 클릭 -> 다 준비되면 바로 게임 시작 -> 퀴즈 개수만큼 퀴즈 생성 => boolean return
    @MessageMapping("/quiz/ready/{id}")
    @SendTo("/topic/quiz/{id}")
    public Map<String, Object> isReadyGameStart(@PathVariable("id") Long familyId, @Header("nativeHeaders") Object header) {
        String userId = header.toString().split("User=\\[")[1].split("]")[0];
        return quizService.isReadyGameStart(familyId, userId);
    }

    // 질문 가져오기 -> 반환 끝나면 게임 종료 -> QuizQuestionRandomResponseDto or null (이건 게임 종료)
    @MessageMapping("/quiz/quiz-question/{id}")
    @SendTo("/topic/quiz/{id}")
    public QuizQuestionRandomResponseDto getQuizQuestion(@PathVariable("id") Long familyId) {
        return quizService.getQuizQuestion(familyId);
    }

    // 정답 확인
    @MessageMapping("/quiz/answer/{id}")
    @SendTo("/topic/quiz/{id}")
    public Map<String, Object> checkQuizAnswer(@PathVariable("id") Long familyId,
                                               @RequestParam("inputAnswer")String inputAnswer,
                                               @Header("nativeHeaders") Object header) {
        String userId = header.toString().split("User=\\[")[1].split("]")[0];
        return quizService.checkQuizAnswer(familyId, inputAnswer, userId);
    }
}

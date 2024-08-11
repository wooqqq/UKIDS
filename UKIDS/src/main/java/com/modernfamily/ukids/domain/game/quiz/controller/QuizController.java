package com.modernfamily.ukids.domain.game.quiz.controller;

import com.modernfamily.ukids.domain.game.quiz.dto.QuizRoom;
import com.modernfamily.ukids.domain.game.quiz.model.service.QuizService;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.response.QuizQuestionRandomResponseDto;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class QuizController {

    private final QuizService quizService;

    // 게임방 생성 -> 게임방 정보 및 connection 반환
    @MessageMapping("/quiz/enter")
    @SendTo("/topic/quiz/{id}")
    public Map<String, Object> enterQuizRoom(@RequestBody Map<String, Object> payload,
                                             SimpMessageHeaderAccessor headerAccessor)
            throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("Received payload: {}", payload);

        String userId = headerAccessor.getUser().getName();
        log.info("Entering quiz room : {}", userId);

        Long id = Long.parseLong(payload.get("familyId").toString());
        return quizService.enterQuizRoom(id, userId);
    }


    // 유저 퇴장
    @MessageMapping("/quiz/exit/{id}")
    public void exitQuizRoom(@PathVariable("id") Long familyId, SimpMessageHeaderAccessor headerAccessor) {
        String userId = headerAccessor.getUser().getName();
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
    public Map<String, Object> isReadyGameStart(@PathVariable("id") Long familyId, SimpMessageHeaderAccessor headerAccessor) {
        String userId = headerAccessor.getUser().getName();
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
                                               SimpMessageHeaderAccessor headerAccessor) {
        String userId = headerAccessor.getUser().getName();
        return quizService.checkQuizAnswer(familyId, inputAnswer, userId);
    }
}

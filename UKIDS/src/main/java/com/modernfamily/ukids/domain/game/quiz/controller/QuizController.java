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
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    private final SimpMessagingTemplate messagingTemplate;


    // 게임방 생성 -> 게임방 정보 및 connection 반환
    @MessageMapping("/quiz/enter")
    public void enterQuizRoom(@RequestBody Map<String, Object> payload,
                                             SimpMessageHeaderAccessor headerAccessor)
            throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("Received payload: {}", payload);

        String userId = headerAccessor.getUser().getName();
        log.info("Entering quiz room : {}", userId);

        Long familyId = Long.parseLong(payload.get("familyId").toString());

        messagingTemplate.convertAndSend("/topic/quiz/" + familyId, quizService.enterQuizRoom(familyId, userId));

    }


    // 유저 퇴장
    @MessageMapping("/quiz/exit")
    public void exitQuizRoom(@RequestBody Map<String, Object> payload, SimpMessageHeaderAccessor headerAccessor) {
        String userId = headerAccessor.getUser().getName();
        Long familyId = Long.parseLong(payload.get("familyId").toString());

        quizService.exitQuizRoom(familyId, userId);
    }

    // 게임방 정보 반환
    @MessageMapping("/quiz/info")
    public void getQuizRoom(@RequestBody Map<String, Object> payload) {
        Long familyId = Long.parseLong(payload.get("familyId").toString());

        messagingTemplate.convertAndSend("/topic/quiz/" + familyId,quizService.getQuizRoom(familyId));

    }

    // 퀴즈 개수 설정
    @MessageMapping("/quiz/quiz-count")
    public void saveQuizCounts(@RequestBody Map<String, Object> payload) {
        Long familyId = Long.parseLong(payload.get("familyId").toString());
        Long counts = Long.parseLong(payload.get("counts").toString());

        messagingTemplate.convertAndSend("/topic/quiz/" + familyId, quizService.saveQuizCounts(familyId, counts));
    }

    // 준비 클릭 -> 다 준비되면 바로 게임 시작 -> 퀴즈 개수만큼 퀴즈 생성 => boolean return
    @MessageMapping("/quiz/ready/{id}")
    public void isReadyGameStart(@RequestBody Map<String, Object> payload, SimpMessageHeaderAccessor headerAccessor) {
        String userId = headerAccessor.getUser().getName();
        Long familyId = Long.parseLong(payload.get("familyId").toString());

        messagingTemplate.convertAndSend("/topic/quiz/" + familyId, quizService.isReadyGameStart(familyId, userId));
    }

    // 질문 가져오기 -> 반환 끝나면 게임 종료 -> QuizQuestionRandomResponseDto or null (이건 게임 종료)
    @MessageMapping("/quiz/quiz-question/{id}")
    public void getQuizQuestion(@RequestBody Map<String, Object> payload) {
        Long familyId = Long.parseLong(payload.get("familyId").toString());

        messagingTemplate.convertAndSend("/topic/quiz/" + familyId, quizService.getQuizQuestion(familyId));
    }

    // 정답 확인
    @MessageMapping("/quiz/answer")
    public void checkQuizAnswer(@RequestBody Map<String, Object> payload,
                                               SimpMessageHeaderAccessor headerAccessor) {
        String userId = headerAccessor.getUser().getName();
        Long familyId = Long.parseLong(payload.get("familyId").toString());
        messagingTemplate.convertAndSend("/topic/quiz/" + familyId, quizService.checkQuizAnswer(familyId, (String) payload.get("inputAnswer"), userId));
    }
}

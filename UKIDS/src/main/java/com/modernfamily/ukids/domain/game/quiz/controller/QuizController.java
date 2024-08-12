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
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

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

        messagingTemplate.convertAndSend("/topic/quiz/" + familyId, quizService.exitQuizRoom(familyId, userId));

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
    @MessageMapping("/quiz/ready")
    public void isReadyGameStart(@RequestBody Map<String, Object> payload, SimpMessageHeaderAccessor headerAccessor) {
        String userId = headerAccessor.getUser().getName();
        Long familyId = Long.parseLong(payload.get("familyId").toString());
        boolean isReady = payload.get("state").toString().equals("true");

        Map<String, Object> quizRoom = quizService.isReadyGameStart(familyId, userId, isReady);
        messagingTemplate.convertAndSend("/topic/quiz/" + familyId, quizRoom);

        if((boolean) quizRoom.get("gameStart")) {
            ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

            scheduler.scheduleAtFixedRate(new Runnable() {
                @Override
                public void run() {
                    Map<String, Object> question = quizService.getQuizQuestion(familyId);

                    // 메세지 전송
                    messagingTemplate.convertAndSend("/topic/quiz/" + familyId, question);

                    // "END"이면 스케줄러 종료
                    if ("END".equals(question.get("gameState"))) {
                        scheduler.shutdown();
                    }
                }
            }, 3, 24, TimeUnit.SECONDS);
        }
    }

    // 정답 확인
    @MessageMapping("/quiz/answer")
    public void checkQuizAnswer(@RequestBody Map<String, Object> payload,
                                               SimpMessageHeaderAccessor headerAccessor) {
        String userId = headerAccessor.getUser().getName();
        Long familyId = Long.parseLong(payload.get("familyId").toString());
        messagingTemplate.convertAndSend("/topic/quiz/" + familyId, quizService.checkQuizAnswer(familyId, (String) payload.get("inputAnswer"), userId));
    }

    @MessageMapping("/quiz/quit")
    public void deleteQuizRoom(@RequestBody Map<String, Object> payload,
                                SimpMessageHeaderAccessor headerAccessor) {
        Long familyId = Long.parseLong(payload.get("familyId").toString());
        quizService.deleteQuizRoom(familyId);

    }
}

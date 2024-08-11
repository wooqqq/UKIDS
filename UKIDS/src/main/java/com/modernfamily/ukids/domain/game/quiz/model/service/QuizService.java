package com.modernfamily.ukids.domain.game.quiz.model.service;

import com.modernfamily.ukids.domain.game.quiz.dto.QuizRoom;
import com.modernfamily.ukids.domain.game.quiz.model.repository.QuizRepository;
import com.modernfamily.ukids.domain.game.quiz.model.repository.QuizRoomRespository;
import com.modernfamily.ukids.domain.game.quizQuestion.dto.response.QuizQuestionRandomResponseDto;
import com.modernfamily.ukids.domain.webrtc.model.service.WebrtcService;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class QuizService {

    // 방 정보
    private Map<Long, QuizRoom> quizRooms;
    private final QuizRepository quizRepository;
    private final QuizRoomRespository quizRoomRespository;
    private final WebrtcService webrtcService;

    @PostConstruct
    private void init() {
        quizRooms = new HashMap<>();
    }

    // 게임방 생성 -> 있으면 참여, 없으면 생성 + 중복 참여인지 검사 + 유저 참여
    // + webrtc 세션 생성 + connection 반환
    public Map<String, Object> enterQuizRoom(Long familyId, String userId) throws OpenViduJavaClientException, OpenViduHttpException {
        if(!quizRooms.containsKey(familyId)){
            String sessionId = webrtcService.initializeSessions(null);
            quizRoomRespository.createGameRoom(sessionId);
        }

        // 참여자 목록에 있어
        if(quizRoomRespository.isExistUser(userId, quizRooms.get(familyId)))
            throw new ExceptionResponse(CustomException.DUPLICATED_ID_EXCEPTION);

        // 이미 게임 진행 중
        if(quizRoomRespository.isPlaying(quizRooms.get(familyId)))
            throw new ExceptionResponse(CustomException.ALREADY_PLAYING_EXCEPTION);

        Map<String, Object> response = new HashMap<>();
        response.put("id", familyId);
        response.put("webrtcConnection", webrtcService.getToken(quizRooms.get(familyId).getSessionId(), null));

        quizRoomRespository.enterGame(userId, familyId, quizRooms.get(familyId));

        response.put("gameRoomInfo", quizRooms.get(familyId));

        return response;
    }


    // 유저 퇴장
    public void exitQuizRoom(Long familyId, String userId) {

        isExistFamilyGame(familyId);

        if(!quizRoomRespository.isExistUser(userId, quizRooms.get(familyId)))
            throw new ExceptionResponse(CustomException.NOT_FOUND_QUIZ_USER_EXCEPTION);

        quizRoomRespository.exitGame(userId, quizRooms.get(familyId));
    }

    // 게임방 정보 반환
    public QuizRoom getQuizRoom(Long familyId) {

        return quizRooms.get(familyId);
    }

    // 퀴즈 개수 설정
    public Map<String, Object> saveQuizCounts(Long familyId, long counts) {
        isExistFamilyGame(familyId);

        quizRoomRespository.saveQuizCount(counts, quizRooms.get(familyId));

        Map<String, Object> response = new HashMap<>();
        response.put("quizCount", quizRooms.get(familyId).getQuizCount());

        return response;
    }

    // 퀴즈 생성 가능 개수 반환
    public Map<String, Object> getQuizCounts(Long familyId) {
        isExistFamilyGame(familyId);

        Map<String, Object> response = new HashMap<>();
        response.put("quizCount", quizRooms.get(familyId).getQuizCount());

        return response;
    }

    // 준비 클릭 -> 다 준비되면 바로 게임 시작 -> 퀴즈 개수만큼 퀴즈 생성
    public Map<String, Object> isReadyGameStart(Long familyId, String userId) {
        isExistFamilyGame(familyId);

        quizRoomRespository.clickReady(userId, quizRooms.get(familyId));

        Map<String, Object> response = new HashMap<>();
        boolean isState = true;

        // 참가자 모두 준비 안됨
        if(!quizRoomRespository.checkReady(quizRooms.get(familyId)))
            isState = false;

        quizRoomRespository.generateQuiz(quizRooms.get(familyId));
        quizRoomRespository.startGame(quizRooms.get(familyId));

        response.put("gameStart", isState);
        return response;
    }

    // 질문 반환 -> 반환 끝나면 게임 종료
    public QuizQuestionRandomResponseDto getQuizQuestion(Long familyId) {
        isExistFamilyGame(familyId);
        QuizQuestionRandomResponseDto quizQuestion = quizRepository.getQuizQuestion(quizRooms.get(familyId));

        if(quizQuestion == null)
            endGame(familyId);

        return quizQuestion;
    }

    // 정답 확인
    public Map<String, Object> checkQuizAnswer(Long familyId, String inputAnswer, String userId) {
        isExistFamilyGame(familyId);

        Map<String, Object> response = new HashMap<>();
        response.put("answer", quizRepository.checkAnswer(quizRooms.get(familyId), userId, inputAnswer));

        return response;
    }

    // 게임 종료 -> DB 저장
    public void endGame(Long familyId) {
        quizRepository.endGame(familyId, quizRooms.get(familyId));
        quizRooms.remove(familyId);
    }

    private void isExistFamilyGame(Long familyId) {
        if(!quizRooms.containsKey(familyId))
            throw new ExceptionResponse(CustomException.NOT_FOUND_QUIZ_GAME_EXCEPTION);
    }
}

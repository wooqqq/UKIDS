package com.modernfamily.ukids.domain.game.callMyName.model.service;

import com.modernfamily.ukids.domain.game.callMyName.dto.CallMyNameRoom;
import com.modernfamily.ukids.domain.game.callMyName.model.repository.CallMyNameRepository;
import com.modernfamily.ukids.domain.game.callMyName.model.repository.CallMyNameRoomRepository;
import com.modernfamily.ukids.domain.game.gameResult.entity.GameType;
import com.modernfamily.ukids.domain.webrtc.model.service.WebrtcService;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CallMyNameServiceImpl implements CallMyNameService {

    // 방 정보
    private Map<Long, CallMyNameRoom> callMyNameRooms;
    private final CallMyNameRepository callMyNameRepository;
    private final CallMyNameRoomRepository callMyNameRoomRepository;
    private final WebrtcService webrtcService;
    
    @PostConstruct
    private void init() {
        callMyNameRooms = new HashMap<>();
    }
    
    // 게임방 생성
    public Map<String, Object> enterCallMyNameRoom(Long familyId, GameType gameType, Principal principal)
            throws OpenViduJavaClientException, OpenViduHttpException {
        String userId = principal.getName();
        if (!callMyNameRooms.containsKey(familyId)) {
            String sessionId = webrtcService.initializeSessions(null);
            callMyNameRoomRepository.createCallMyNameRoom(gameType, sessionId);
        }

        if (callMyNameRoomRepository.isExistUser(userId, callMyNameRooms.get(familyId)))
            throw new ExceptionResponse(CustomException.DUPLICATED_ID_EXCEPTION);

        if (callMyNameRoomRepository.isPlaying(callMyNameRooms.get(familyId)))
            throw new ExceptionResponse(CustomException.ALREADY_PLAYING_EXCEPTION);

        Map<String, Object> response = new HashMap<>();
        response.put("id", familyId);
        response.put("webrtcConnection", webrtcService.getToken(callMyNameRooms.get(familyId).getSessionId(), null));

        callMyNameRoomRepository.enterGame(userId, callMyNameRooms.get(familyId));

        response.put("callMyNameRoomInfo", callMyNameRooms.get(familyId));

        return response;
    }

    // 참가자 퇴장
    public void exitCallMyNameRoom(Long familyId, Principal principal) {
        String userId = principal.getName();

        isExistFamilyGame(familyId);

        if (!callMyNameRoomRepository.isExistUser(userId, callMyNameRooms.get(familyId)))
            throw new ExceptionResponse(CustomException.NOT_FOUND_CALL_MY_NAME_EXCEPTION);

        callMyNameRoomRepository.exitGame(userId, callMyNameRooms.get(familyId));
    }

    // 게임방 정보 반환
    public CallMyNameRoom getCallMyNameRoom(Long familyId) {

        return callMyNameRooms.get(familyId);
    }

    // 키워드 설정
//    public Map<String, Object>

    public Map<String, Object> isReadyGameStart(Long familyId, Principal principal) {
        String userId = principal.getName();
        isExistFamilyGame(familyId);

        callMyNameRoomRepository.clickReady(userId, callMyNameRooms.get(familyId));

        Map<String, Object> response = new HashMap<>();
        boolean isState = true;

        // 참가자 모두 준비 안됨
        if (!callMyNameRoomRepository.checkReady(callMyNameRooms.get(familyId)))
            isState = false;

        // 키워드 생성 추가해야함
        callMyNameRoomRepository.startGame(callMyNameRooms.get(familyId));

        response.put("gameStart", isState);
        return response;
    }

    // 게임 종료가 반환되는 메서드
    // 못맞힌 사람 한명이 남는다면 게임 종료

    // 정답 확인
    public Map<String, Object> checkAnswer(Long familyId, String inputAnswer, Principal principal) {
        String userId = principal.getName();
        isExistFamilyGame(familyId);

        Map<String, Object> response = new HashMap<>();
        response.put("answer", callMyNameRepository.checkAnswer(callMyNameRooms.get(familyId), userId, inputAnswer));

        return response;
    }

    // 게임 종료
    public void endGame(Long familyId) {
        callMyNameRepository.endGame(familyId, callMyNameRooms.get(familyId));
        callMyNameRooms.remove(familyId);
    }

    private void isExistFamilyGame(Long familyId) {
        if (!callMyNameRooms.containsKey(familyId))
            throw new ExceptionResponse(CustomException.NOT_FOUND_CALL_MY_NAME_EXCEPTION);
    }


}

package com.modernfamily.ukids.domain.game.callMyName.model.service;

import com.modernfamily.ukids.domain.game.callMyName.dto.CallMyNameRoom;
import com.modernfamily.ukids.domain.game.gameResult.entity.GameType;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;

import java.security.Principal;
import java.util.Map;

public interface CallMyNameService {

    Map<String, Object> enterCallMyNameRoom(Long familyId, GameType gameType, Principal principal)
            throws OpenViduJavaClientException, OpenViduHttpException;

    void exitCallMyNameRoom(Long familyId, Principal principal);

    CallMyNameRoom getCallMyNameRoom(Long familyId);

    Map<String, Object> isReadyGameStart(Long familyId, Principal principal);

    Map<String, Object> checkAnswer(Long familyId, String inputAnswer, Principal principal);

    void endGame(Long familyId);

}

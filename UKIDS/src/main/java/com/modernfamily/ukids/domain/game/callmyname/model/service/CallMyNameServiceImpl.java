package com.modernfamily.ukids.domain.game.callmyname.model.service;

import com.modernfamily.ukids.domain.game.callmyname.dto.CallMyNameRoom;
import com.modernfamily.ukids.domain.game.callmyname.model.repository.CallMyNameRepository;
import com.modernfamily.ukids.domain.game.callmyname.model.repository.CallMyNameRoomRepository;
import com.modernfamily.ukids.domain.game.gameResult.entity.GameType;
import com.modernfamily.ukids.domain.webrtc.model.service.WebrtcService;
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
        return null;
    }
}

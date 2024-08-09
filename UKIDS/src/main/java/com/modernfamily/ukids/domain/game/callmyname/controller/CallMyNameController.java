package com.modernfamily.ukids.domain.game.callmyname.controller;

import com.modernfamily.ukids.domain.game.callmyname.model.service.CallMyNameService;
import com.modernfamily.ukids.domain.game.gameResult.entity.GameType;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Principal;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class CallMyNameController {

    private final CallMyNameService callMyNameService;

    // 게임방 생성
    @MessageMapping("/call/enter/{id}")
    @SendTo("/topic/call/{id}")
    public Map<String, Object> enterCallMyNameRoom(@PathVariable("id") Long familyId,
                                                   @RequestParam("gameType")GameType gameType,
                                                   Principal principal)
    throws OpenViduJavaClientException, OpenViduHttpException {
//        return callMyNameService.
        return null;
    }

}

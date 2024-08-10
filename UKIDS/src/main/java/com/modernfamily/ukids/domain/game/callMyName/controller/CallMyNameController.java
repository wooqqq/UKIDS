package com.modernfamily.ukids.domain.game.callMyName.controller;

import com.modernfamily.ukids.domain.game.callMyName.dto.CallMyNameRoom;
import com.modernfamily.ukids.domain.game.callMyName.model.service.CallMyNameService;
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
        return callMyNameService.enterCallMyNameRoom(familyId, gameType, principal);
    }

    // 참가자 퇴장
    @MessageMapping("/call/exit/{id}")
    public void exitCallMyNameRoom(@PathVariable("id") Long familyId, Principal principal) {
        callMyNameService.exitCallMyNameRoom(familyId, principal);
    }

    // 게임방 정보 반환
    @MessageMapping("/call/info/{id}")
    @SendTo("/topic/call/{id}")
    public CallMyNameRoom getCallMyNameRoom(@PathVariable("id") Long familyId) {
        return callMyNameService.getCallMyNameRoom(familyId);
    }

    // 키워드 카테고리 설정
    @MessageMapping("/call/keyword-category/{id}")
    @SendTo("/topic/call/{id}")
    public Map<String, Object> saveCategory(@PathVariable("id") Long familyId,
                                            @RequestParam("category") String category) {
        // 입력된 category와 CallMyNameKeywordType의 title 과 일치되는 것 찾기
        return null;
    }

    // 준비 클릭
    @MessageMapping("/call/ready/{id}")
    @SendTo("/topic/call/{id}")
    public Map<String, Object> isReadyGameStart(@PathVariable("id") Long familyId, Principal principal) {
        return callMyNameService.isReadyGameStart(familyId, principal);
    }

    // 키워드 가져오기
    // CallMyNameKeywordResponseDto 생성 후 구현

//    @MessageMapping("/call/call-keyword/{id}")
//    @SendTo("/topic/call/{id}")
//    public CallMyNameKeywordResponseDto getCallMyNameKeyword(@PathVariable("id") Long familyId) {
//        return callMyNameService.getCallMyNameKeyword(familyId);
//    }

    // 질문하기


    // 정답 확인
    @MessageMapping("/call/answer/{id}")
    @SendTo("/topic/call/{id}")
    public Map<String, Object> checkAnswer(@PathVariable("id") Long familyId,
                                           @RequestParam("inputAnswer") String inputAnswer,
                                           Principal principal) {
        return callMyNameService.checkAnswer(familyId, inputAnswer, principal);
    }

}

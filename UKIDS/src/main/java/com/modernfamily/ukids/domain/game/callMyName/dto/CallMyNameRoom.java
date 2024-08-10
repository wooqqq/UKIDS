package com.modernfamily.ukids.domain.game.callMyName.dto;

import com.modernfamily.ukids.domain.game.callMyName.entity.CallMyNameKeyword;
import com.modernfamily.ukids.domain.game.callMyName.entity.CallMyNameKeywordType;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
public class CallMyNameRoom {
    private String sessionId;
    private boolean isStart;
    private Long numberOfParticipants;
    private Long turnCount;
    private int currentTurnIndex;
    private CallMyNameKeywordType keywordType;
    private Map<Long, CallMyNameKeyword> randomKeywordList;
    private HashMap<String, Participate> participantList;

    @Builder
    private CallMyNameRoom(String sessionId, boolean isStart,
                           Long numberOfParticipants, Long turnCount, int currentTurnIndex, CallMyNameKeywordType keywordType,
                           Map<Long, CallMyNameKeyword> randomKeywordList, HashMap<String, Participate> participantList) {
        this.sessionId = sessionId;
        this.isStart = isStart;
        this.numberOfParticipants = numberOfParticipants;
        this.turnCount = turnCount;
        this.currentTurnIndex = currentTurnIndex;
        this.keywordType = keywordType;
        this.randomKeywordList = randomKeywordList;
        this.participantList = participantList;
    }

    public static CallMyNameRoom createCallMyNameRoom(String sessionId) {
        return CallMyNameRoom.builder()
                .sessionId(sessionId)
                .isStart(false)
                .numberOfParticipants(0L)
                .turnCount(0L)
                .currentTurnIndex(-1)
                .keywordType(null)
                .randomKeywordList(null)
                .participantList(new HashMap<String, Participate>())
                .build();
    }

    public void startGame() {
        this.isStart = true;
    }

    public void enterParticipate(String userId, Participate participate) {
        participantList.put(userId, participate);
        ++this.numberOfParticipants;
    }

    public void exitParticipate(String userId) {
        participantList.remove(userId);
    }

    public void generateKeywordType(CallMyNameKeywordType keywordType) {
        this.keywordType = keywordType;
    }

    public void generateRandomKeyword(List<CallMyNameKeyword> randomKeywords) {
//        for (CallMyNameKeyword randomKeyword : randomKeywords) {
//            this.randomKeywordList.put()
//        }
        // 키워드 랜덤으로 가져와서 어떻게 분배해줄지 고민
        // 1. Map 으로 참여자, 키워드 관리
        // 2. Participate 에 Keyword를 변수로 가지고 있게 하기
    }


}

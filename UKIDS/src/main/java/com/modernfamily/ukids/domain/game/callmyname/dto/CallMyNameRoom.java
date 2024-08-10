package com.modernfamily.ukids.domain.game.callmyname.dto;

import com.modernfamily.ukids.domain.game.callmyname.entity.CallMyNameKeyword;
import com.modernfamily.ukids.domain.game.gameResult.entity.GameType;
import com.querydsl.codegen.Keywords;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
public class CallMyNameRoom {
    private GameType gameType;
    private String sessionId;
    private boolean isStart;
    private Long numberOfParticipants;
    private Long turnCount;
    private int currentTurnIndex;
    private HashMap<String, Participate> participantList;
    private Map<Long, CallMyNameKeyword> randomKeywordList;

    @Builder
    private CallMyNameRoom(GameType gameType, String sessionId, boolean isStart,
                           Long numberOfParticipants, Long turnCount, int currentTurnIndex,
                           HashMap<String, Participate> participantList, Map<Long, CallMyNameKeyword> randomKeywordList) {
        this.gameType = gameType;
        this.sessionId = sessionId;
        this.isStart = isStart;
        this.numberOfParticipants = numberOfParticipants;
        this.turnCount = turnCount;
        this.currentTurnIndex = currentTurnIndex;
        this.participantList = participantList;
        this.randomKeywordList = randomKeywordList;
    }

    public static CallMyNameRoom createCallMyNameRoom(GameType gameType, String sessionId) {
        return CallMyNameRoom.builder()
                .gameType(gameType)
                .sessionId(sessionId)
                .isStart(false)
                .numberOfParticipants(0L)
                .turnCount(0L)
                .currentTurnIndex(-1)
                .participantList(new HashMap<String, Participate>())
                .randomKeywordList(null)
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

    public void generateRandomKeyword(List<CallMyNameKeyword> randomKeywords) {
//        for (CallMyNameKeyword randomKeyword : randomKeywords) {
//            this.randomKeywordList.put()
//        }
        // 키워드 랜덤으로 가져와서 어떻게 분배해줄지 고민
        // 1. Map 으로 참여자, 키워드 관리
        // 2. Participate 에 Keyword를 변수로 가지고 있게 하기
    }


}

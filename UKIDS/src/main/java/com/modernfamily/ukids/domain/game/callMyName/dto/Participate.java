package com.modernfamily.ukids.domain.game.callMyName.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Participate {
    private Long turn;
    private String keyword;
    private boolean isReady;
    private boolean isCorrect;
    private boolean isHost;

    private Participate(Long turn, String keyword, boolean isReady, boolean isCorrect, boolean isHost) {
        this.turn = turn;
        this.keyword = keyword;
        this.isReady = isReady;
        this.isCorrect = isCorrect;
        this.isHost = isHost;
    }

    public static Participate createParticipate(boolean isHost) {
        return new Participate(0L, null, true, false, isHost);
    }

    public void generateKeyword(String keyword) {
        this.keyword = keyword;
    }

    public void wrongAnswer() {
        this.turn++;
    }

    public void clickReady() {
        this.isReady = !this.isReady;
    }

    public void correct() {
        this.isCorrect = true;
    }

}

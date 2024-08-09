package com.modernfamily.ukids.domain.game.callmyname.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Participate {
    private Long turn;
    private boolean isReady;

    private Participate(Long turn, boolean isReady) {
        this.turn = turn;
        this.isReady = isReady;
    }

    public static Participate createParticipate() {
        return new Participate(0L, true);
    }

    public void wrongAnswer() {
        this.turn++;
    }

    public void clickReady() {
        this.isReady = !this.isReady;
    }

}

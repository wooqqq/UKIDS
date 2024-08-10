package com.modernfamily.ukids.domain.game.callMyName.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Participate {
    private Long turn;
    private boolean isReady;
    private boolean isCorrect;

    private Participate(Long turn, boolean isReady, boolean isCorrect) {
        this.turn = turn;
        this.isReady = isReady;
        this.isCorrect = isCorrect;
    }

    public static Participate createParticipate() {
        return new Participate(0L, true, false);
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

package com.modernfamily.ukids.domain.game.callMyName.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CallMyNameKeywordType {

    IDOL("아이돌"), ACTOR("배우"), HISTORY("역사인물");

    private String title;
}

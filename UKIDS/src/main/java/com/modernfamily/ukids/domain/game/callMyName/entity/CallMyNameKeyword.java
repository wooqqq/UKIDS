package com.modernfamily.ukids.domain.game.callMyName.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CallMyNameKeyword {

    private CallMyNameKeywordType category;

    private String word;
}

package com.modernfamily.ukids.domain.game.callmyname.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CallMyNameKeyword {

    private Long id;

    private CallMyNameKeywordType category;

    private String word;
}

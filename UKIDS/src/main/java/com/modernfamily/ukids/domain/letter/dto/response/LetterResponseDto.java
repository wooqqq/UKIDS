package com.modernfamily.ukids.domain.letter.dto.response;

import com.modernfamily.ukids.domain.letter.entity.Letter;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class LetterResponseDto {

    private Long letterId;

    private String content;

    private String familyName;

    private String fromUsername;

    private String toUsername;

    private String createDate;


    @Builder
    private LetterResponseDto(Long letterId, String content, String familyName, String fromUsername, String toUsername, String createDate) {
        this.letterId = letterId;
        this.content = content;
        this.familyName = familyName;
        this.fromUsername = fromUsername;
        this.toUsername = toUsername;
        this.createDate = createDate;
    }

    public static LetterResponseDto createResponseDto(Letter letter) {
        return LetterResponseDto.builder()
                .letterId(letter.getLetterId())
                .content(letter.getContent())
                .familyName(letter.getTree().getFamily().getName())
                .fromUsername(letter.getFromUser().getName())
                .toUsername(letter.getToUser().getName())
                .createDate(letter.getCreateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .build();
    }
}
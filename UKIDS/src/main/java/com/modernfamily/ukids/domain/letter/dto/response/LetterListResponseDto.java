package com.modernfamily.ukids.domain.letter.dto.response;

import com.modernfamily.ukids.domain.letter.entity.Letter;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class LetterListResponseDto {

    private Long letterId;

    private String content;

    private String familyName;

    private String fromUsername;
    private Long fromUserId;

    private String toUsername;
    private Long toUserId;

    private String createDate;

    private boolean isRead;


    @Builder
    private LetterListResponseDto(Long letterId, String content, String familyName, String fromUsername, Long fromUserId, String toUsername, Long toUserId, String createDate, boolean isRead) {
        this.letterId = letterId;
        this.content = content;
        this.familyName = familyName;
        this.fromUsername = fromUsername;
        this.fromUserId = fromUserId;
        this.toUsername = toUsername;
        this.toUserId = toUserId;
        this.createDate = createDate;
        this.isRead = isRead;
    }

    public static LetterListResponseDto createResponseDto(Letter letter) {
        return LetterListResponseDto.builder()
                .letterId(letter.getLetterId())
                .content(letter.getContent())
                .familyName(letter.getTree().getFamily().getName())
                .fromUsername(letter.getFromUser().getName())
                .fromUserId(letter.getFromUser().getUserId())
                .toUsername(letter.getToUser().getName())
                .toUserId(letter.getToUser().getUserId())
                .createDate(letter.getCreateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .isRead(letter.isRead())
                .build();
    }

}
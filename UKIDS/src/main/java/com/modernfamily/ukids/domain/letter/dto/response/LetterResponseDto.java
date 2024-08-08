package com.modernfamily.ukids.domain.letter.dto.response;

import com.modernfamily.ukids.domain.tree.dto.response.TreeInfoResponseDto;
import com.modernfamily.ukids.domain.user.dto.UserDto;
import lombok.Getter;

@Getter
public class LetterResponseDto {

    private Long letterId;

    private String content;

    private TreeInfoResponseDto tree;

    private UserDto fromUser;

    private UserDto toUser;

    private boolean isOpen;

    private boolean isRead;

}
package com.modernfamily.ukids.domain.letter.dto;

import com.modernfamily.ukids.domain.letter.entity.Letter;
import com.modernfamily.ukids.domain.tree.entity.Tree;
import com.modernfamily.ukids.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LetterDto {

    private Long letterId;
    private String content;
    private Tree tree;
    private User fromUser;
    private User toUser;
    private boolean isDelete;
    private boolean isOpen;

    @Builder
    public LetterDto(Long letterId, String content, Tree tree, User fromUser, User toUser, boolean isDelete, boolean isOpen) {
        this.letterId = letterId;
        this.content = content;
        this.tree = tree;
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.isDelete = isDelete;
        this.isOpen = isOpen;
    }

    public Letter toEntity() {
        Letter letter = Letter.builder()
                .content(content)
                .tree(tree)
                .fromUser(fromUser)
                .toUser(toUser)
                .isDelete(isDelete)
                .isOpen(isOpen)
                .build();
        return letter;
    }
}

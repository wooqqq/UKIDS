package com.modernfamily.ukids.domain.letter.entity;

import com.modernfamily.ukids.domain.tree.entity.Tree;
import com.modernfamily.ukids.domain.user.entity.User;
import com.modernfamily.ukids.global.baseTimeEntity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@NoArgsConstructor
@Getter
public class Letter extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long letterId;

    @Column(nullable = false, length = 3000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "tree_id", nullable = false)
    private Tree tree;

    @ManyToOne
    @JoinColumn(name = "from_id", referencedColumnName = "user_id", nullable = false)
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "to_id", referencedColumnName = "user_id", nullable = false)
    private User toUser;

    @ColumnDefault("false")
    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    private boolean isDelete;

    @ColumnDefault("false")
    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    private boolean isOpen;

    @Builder
    private Letter(String content, Tree tree, User fromUser, User toUser, boolean isDelete, boolean isOpen) {
        this.content = content;
        this.tree = tree;
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.isDelete = isDelete;
        this.isOpen = isOpen;
    }

    public static Letter createLetter(String content, Tree tree, User fromUser, User toUser) {
        return Letter.builder()
                .content(content)
                .tree(tree)
                .fromUser(fromUser)
                .toUser(toUser)
                .isDelete(false)
                .isOpen(false)
                .build();
    }

    public void setIsDelete(boolean isDelete) {
        this.isDelete = isDelete;
    }

    // Mapper 로 이동시키기
//    public LetterDto toDto() {
//        return LetterDto.builder()
//                .content(this.content)
//                .tree(this.tree)
//                .fromUser(this.fromUser)
//                .toUser(this.toUser)
//                .isDelete(this.isDelete)
//                .isOpen(this.isOpen)
//                .build();
//    }
}

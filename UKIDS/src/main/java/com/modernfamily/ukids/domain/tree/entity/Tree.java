package com.modernfamily.ukids.domain.tree.entity;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.letter.entity.Letter;
import com.modernfamily.ukids.global.baseTimeEntity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Entity
@Getter
public class Tree extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long treeId;

    @OneToMany(mappedBy = "tree")
    private List<Letter> letters;

    @Column(nullable = false)
    public Long exp = 0L;   // 경험치 default = 0

    @ColumnDefault("false")
    @Column(columnDefinition = "TINYINT(1)")
    private boolean isComplete;

    @ManyToOne
    @JoinColumn(name = "tree_type_id")
    private TreeType treeType;

    @ManyToOne
    @JoinColumn(name = "family_id")
    private Family family;

}

package com.modernfamily.ukids.domain.tree.entity;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.global.baseTimeEntity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Where;

@Entity
@NoArgsConstructor
@Getter
@Where(clause = "is_complete = false")
public class Tree extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long treeId;

    @Column(nullable = false)
    public Long exp = 0L;   // 경험치 default = 0

    @ColumnDefault("false")
    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    private boolean isComplete;

    @ManyToOne
    @JoinColumn(name = "tree_type_id")
    private TreeType treeType;

    @ManyToOne
    @JoinColumn(name = "family_id")
    private Family family;

    public void setFamily(Family family) {
        this.family = family;
    }

    public void setExp(Long exp) {
        this.exp = exp;
    }

    public void setIsComplete(boolean isComplete) {
        this.isComplete = isComplete;
    }

}

package com.modernfamily.ukids.domain.family.entity;

import com.modernfamily.ukids.domain.user.entity.User;
import com.modernfamily.ukids.global.baseTimeEntity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
public class Family extends BaseTimeEntity {

    public Family() {
    }

    public Family(Long familyId, User user, String name, String code, boolean isDelete, String password) {
        this.familyId = familyId;
        this.user = user;
        this.name = name;
        this.code = code;
        this.isDelete = isDelete;
        this.password = password;
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long familyId;

    @ManyToOne
    @JoinColumn(name = "representative", referencedColumnName = "user_id")
    private User user;

    @Column(length = 30, nullable = false)
    private String name;
    @Column(length = 10, nullable = false, unique = true)
    private String code;

    @ColumnDefault("false")
    @Column(columnDefinition = "TINYINT(1)")
    private boolean isDelete;

    @Column(length = 16)
    private String password;

}
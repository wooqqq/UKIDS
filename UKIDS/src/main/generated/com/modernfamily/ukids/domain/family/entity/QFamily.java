package com.modernfamily.ukids.domain.family.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFamily is a Querydsl query type for Family
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFamily extends EntityPathBase<Family> {

    private static final long serialVersionUID = 1850075749L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFamily family = new QFamily("family");

    public final com.modernfamily.ukids.global.baseTimeEntity.QBaseTimeEntity _super = new com.modernfamily.ukids.global.baseTimeEntity.QBaseTimeEntity(this);

    public final StringPath code = createString("code");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final NumberPath<Long> familyId = createNumber("familyId", Long.class);

    public final BooleanPath isDelete = createBoolean("isDelete");

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public final com.modernfamily.ukids.domain.user.entity.QUser user;

    public QFamily(String variable) {
        this(Family.class, forVariable(variable), INITS);
    }

    public QFamily(Path<? extends Family> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFamily(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFamily(PathMetadata metadata, PathInits inits) {
        this(Family.class, metadata, inits);
    }

    public QFamily(Class<? extends Family> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.modernfamily.ukids.domain.user.entity.QUser(forProperty("user")) : null;
    }

}


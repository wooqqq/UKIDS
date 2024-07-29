package com.modernfamily.ukids.domain.caption.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCaption is a Querydsl query type for Caption
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCaption extends EntityPathBase<Caption> {

    private static final long serialVersionUID = -1653012669L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCaption caption = new QCaption("caption");

    public final com.modernfamily.ukids.global.baseTimeEntity.QBaseTimeEntity _super = new com.modernfamily.ukids.global.baseTimeEntity.QBaseTimeEntity(this);

    public final NumberPath<Long> captionId = createNumber("captionId", Long.class);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final BooleanPath isDelete = createBoolean("isDelete");

    public final com.modernfamily.ukids.domain.photo.entity.QPhoto photo;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QCaption(String variable) {
        this(Caption.class, forVariable(variable), INITS);
    }

    public QCaption(Path<? extends Caption> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCaption(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCaption(PathMetadata metadata, PathInits inits) {
        this(Caption.class, metadata, inits);
    }

    public QCaption(Class<? extends Caption> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.photo = inits.isInitialized("photo") ? new com.modernfamily.ukids.domain.photo.entity.QPhoto(forProperty("photo"), inits.get("photo")) : null;
    }

}


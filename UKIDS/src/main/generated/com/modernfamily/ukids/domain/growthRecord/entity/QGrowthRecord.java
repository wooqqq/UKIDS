package com.modernfamily.ukids.domain.growthRecord.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGrowthRecord is a Querydsl query type for GrowthRecord
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGrowthRecord extends EntityPathBase<GrowthRecord> {

    private static final long serialVersionUID = 1043664589L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGrowthRecord growthRecord = new QGrowthRecord("growthRecord");

    public final com.modernfamily.ukids.global.baseTimeEntity.QBaseTimeEntity _super = new com.modernfamily.ukids.global.baseTimeEntity.QBaseTimeEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final DatePath<java.time.LocalDate> date = createDate("date", java.time.LocalDate.class);

    public final com.modernfamily.ukids.domain.growthFolder.entity.QGrowthFolder folder;

    public final StringPath imageName = createString("imageName");

    public final StringPath imageUrl = createString("imageUrl");

    public final BooleanPath isDelete = createBoolean("isDelete");

    public final NumberPath<Long> recordId = createNumber("recordId", Long.class);

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public final com.modernfamily.ukids.domain.user.entity.QUser user;

    public QGrowthRecord(String variable) {
        this(GrowthRecord.class, forVariable(variable), INITS);
    }

    public QGrowthRecord(Path<? extends GrowthRecord> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGrowthRecord(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGrowthRecord(PathMetadata metadata, PathInits inits) {
        this(GrowthRecord.class, metadata, inits);
    }

    public QGrowthRecord(Class<? extends GrowthRecord> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.folder = inits.isInitialized("folder") ? new com.modernfamily.ukids.domain.growthFolder.entity.QGrowthFolder(forProperty("folder"), inits.get("folder")) : null;
        this.user = inits.isInitialized("user") ? new com.modernfamily.ukids.domain.user.entity.QUser(forProperty("user")) : null;
    }

}


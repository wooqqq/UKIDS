package com.modernfamily.ukids.domain.growthFolder.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGrowthFolder is a Querydsl query type for GrowthFolder
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGrowthFolder extends EntityPathBase<GrowthFolder> {

    private static final long serialVersionUID = -981582201L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGrowthFolder growthFolder = new QGrowthFolder("growthFolder");

    public final com.modernfamily.ukids.global.baseTimeEntity.QBaseTimeEntity _super = new com.modernfamily.ukids.global.baseTimeEntity.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final com.modernfamily.ukids.domain.family.entity.QFamily family;

    public final NumberPath<Long> folderId = createNumber("folderId", Long.class);

    public final StringPath folderName = createString("folderName");

    public final BooleanPath isDelete = createBoolean("isDelete");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QGrowthFolder(String variable) {
        this(GrowthFolder.class, forVariable(variable), INITS);
    }

    public QGrowthFolder(Path<? extends GrowthFolder> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGrowthFolder(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGrowthFolder(PathMetadata metadata, PathInits inits) {
        this(GrowthFolder.class, metadata, inits);
    }

    public QGrowthFolder(Class<? extends GrowthFolder> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.family = inits.isInitialized("family") ? new com.modernfamily.ukids.domain.family.entity.QFamily(forProperty("family"), inits.get("family")) : null;
    }

}


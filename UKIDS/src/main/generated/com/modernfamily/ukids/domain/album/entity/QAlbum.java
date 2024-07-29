package com.modernfamily.ukids.domain.album.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAlbum is a Querydsl query type for Album
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAlbum extends EntityPathBase<Album> {

    private static final long serialVersionUID = -2004614877L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAlbum album = new QAlbum("album");

    public final NumberPath<Long> albumId = createNumber("albumId", Long.class);

    public final DatePath<java.time.LocalDate> date = createDate("date", java.time.LocalDate.class);

    public final com.modernfamily.ukids.domain.family.entity.QFamily family;

    public final StringPath title = createString("title");

    public QAlbum(String variable) {
        this(Album.class, forVariable(variable), INITS);
    }

    public QAlbum(Path<? extends Album> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAlbum(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAlbum(PathMetadata metadata, PathInits inits) {
        this(Album.class, metadata, inits);
    }

    public QAlbum(Class<? extends Album> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.family = inits.isInitialized("family") ? new com.modernfamily.ukids.domain.family.entity.QFamily(forProperty("family"), inits.get("family")) : null;
    }

}


package com.modernfamily.ukids.domain.tree.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTree is a Querydsl query type for Tree
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTree extends EntityPathBase<Tree> {

    private static final long serialVersionUID = -535740391L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTree tree = new QTree("tree");

    public final com.modernfamily.ukids.global.baseTimeEntity.QBaseTimeEntity _super = new com.modernfamily.ukids.global.baseTimeEntity.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final NumberPath<Long> exp = createNumber("exp", Long.class);

    public final com.modernfamily.ukids.domain.family.entity.QFamily family;

    public final BooleanPath isComplete = createBoolean("isComplete");

    public final ListPath<com.modernfamily.ukids.domain.letter.entity.Letter, com.modernfamily.ukids.domain.letter.entity.QLetter> letters = this.<com.modernfamily.ukids.domain.letter.entity.Letter, com.modernfamily.ukids.domain.letter.entity.QLetter>createList("letters", com.modernfamily.ukids.domain.letter.entity.Letter.class, com.modernfamily.ukids.domain.letter.entity.QLetter.class, PathInits.DIRECT2);

    public final NumberPath<Long> treeId = createNumber("treeId", Long.class);

    public final QTreeType treeType;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QTree(String variable) {
        this(Tree.class, forVariable(variable), INITS);
    }

    public QTree(Path<? extends Tree> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTree(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTree(PathMetadata metadata, PathInits inits) {
        this(Tree.class, metadata, inits);
    }

    public QTree(Class<? extends Tree> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.family = inits.isInitialized("family") ? new com.modernfamily.ukids.domain.family.entity.QFamily(forProperty("family"), inits.get("family")) : null;
        this.treeType = inits.isInitialized("treeType") ? new QTreeType(forProperty("treeType")) : null;
    }

}


package com.modernfamily.ukids.domain.tree.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTreeType is a Querydsl query type for TreeType
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTreeType extends EntityPathBase<TreeType> {

    private static final long serialVersionUID = -151417101L;

    public static final QTreeType treeType = new QTreeType("treeType");

    public final StringPath name = createString("name");

    public final NumberPath<Long> treeTypeId = createNumber("treeTypeId", Long.class);

    public QTreeType(String variable) {
        super(TreeType.class, forVariable(variable));
    }

    public QTreeType(Path<? extends TreeType> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTreeType(PathMetadata metadata) {
        super(TreeType.class, metadata);
    }

}


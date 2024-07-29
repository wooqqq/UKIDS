package com.modernfamily.ukids.domain.familyMember.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFamilyMember is a Querydsl query type for FamilyMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFamilyMember extends EntityPathBase<FamilyMember> {

    private static final long serialVersionUID = -1994728423L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFamilyMember familyMember = new QFamilyMember("familyMember");

    public final DateTimePath<java.time.LocalDateTime> approvalDate = createDateTime("approvalDate", java.time.LocalDateTime.class);

    public final com.modernfamily.ukids.domain.family.entity.QFamily family;

    public final NumberPath<Long> familyMemberId = createNumber("familyMemberId", Long.class);

    public final BooleanPath isApproval = createBoolean("isApproval");

    public final BooleanPath isDelete = createBoolean("isDelete");

    public final DateTimePath<java.time.LocalDateTime> leaveDate = createDateTime("leaveDate", java.time.LocalDateTime.class);

    public final StringPath role = createString("role");

    public final com.modernfamily.ukids.domain.user.entity.QUser user;

    public QFamilyMember(String variable) {
        this(FamilyMember.class, forVariable(variable), INITS);
    }

    public QFamilyMember(Path<? extends FamilyMember> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFamilyMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFamilyMember(PathMetadata metadata, PathInits inits) {
        this(FamilyMember.class, metadata, inits);
    }

    public QFamilyMember(Class<? extends FamilyMember> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.family = inits.isInitialized("family") ? new com.modernfamily.ukids.domain.family.entity.QFamily(forProperty("family"), inits.get("family")) : null;
        this.user = inits.isInitialized("user") ? new com.modernfamily.ukids.domain.user.entity.QUser(forProperty("user")) : null;
    }

}


package com.modernfamily.ukids.domain.caption.model.repository;

import com.modernfamily.ukids.domain.album.entity.Album;
import com.modernfamily.ukids.domain.caption.entity.QCaption;
import com.modernfamily.ukids.domain.photo.entity.Photo;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CaptionRepositoryImpl implements CaptionRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    private QCaption caption = QCaption.caption;

    public long deleteAllByAlbum(Album album){
        return queryFactory
                .update(caption)
                .set(caption.isDelete, true)
                .where(caption.photo.album.eq(album))
                .execute();
    }

    public long deleteAllByPhoto(Photo photo){
        return queryFactory
                .update(caption)
                .set(caption.isDelete, true)
                .where(caption.photo.eq(photo))
                .execute();
    }
}

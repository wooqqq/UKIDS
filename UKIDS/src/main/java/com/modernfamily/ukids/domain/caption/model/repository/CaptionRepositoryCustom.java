package com.modernfamily.ukids.domain.caption.model.repository;

import com.modernfamily.ukids.domain.album.entity.Album;
import com.modernfamily.ukids.domain.caption.entity.Caption;
import com.modernfamily.ukids.domain.photo.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface CaptionRepositoryCustom {
    long deleteAllByAlbum(Album album);

    long deleteAllByPhoto(Photo photo);
}

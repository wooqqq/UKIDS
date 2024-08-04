package com.modernfamily.ukids.domain.pictureDiary.model.repository;

import com.modernfamily.ukids.domain.pictureDiary.entity.PictureDiary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PictureDiaryRepository extends JpaRepository<PictureDiary, Long> {

    Optional<PictureDiary> findByPictureDiaryId(Long pictureDiaryId);
}

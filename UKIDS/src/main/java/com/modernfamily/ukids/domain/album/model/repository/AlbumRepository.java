package com.modernfamily.ukids.domain.album.model.repository;

import com.modernfamily.ukids.domain.album.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {

    Optional<Album> findByDate(LocalDate date);

    Optional<Album> findByAlbumId(Long albumId);

}

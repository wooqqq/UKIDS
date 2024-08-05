package com.modernfamily.ukids.domain.growthFolder.model.repository;

import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderRequestDto;
import com.modernfamily.ukids.domain.growthFolder.dto.GrowthFolderUpdateRequestDto;
import com.modernfamily.ukids.domain.growthFolder.entity.GrowthFolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface GrowthFolderRepository extends JpaRepository<GrowthFolder, Long> {

    Optional<GrowthFolder> findByFolderId(Long folderId);

    @Query("select gf from GrowthFolder gf " +
            "join fetch gf.family f " +
            "where gf.family.familyId = :familyId " +
            "and gf.isDelete = false")
    List<GrowthFolder> getGrowthFolders(Long familyId);

    @Modifying
    @Transactional
    @Query(value = "update GrowthFolder gf " +
            "set gf.folderName = :#{#growthFolderUpdateRequestDto.folderName} " +
            "where gf.folderId = :#{#growthFolderUpdateRequestDto.folderId}")
    void updateGrowthFolder(GrowthFolderUpdateRequestDto growthFolderUpdateRequestDto);

    @Modifying
    @Transactional
    @Query(value = "update GrowthFolder gf " +
            "set gf.isDelete = true " +
            "where gf.folderId = :folderId")
    void deleteGrowthFolder(Long folderId);
}

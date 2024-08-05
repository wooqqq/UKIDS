package com.modernfamily.ukids.domain.growthRecord.model.repository;

import com.modernfamily.ukids.domain.growthRecord.entity.GrowthRecord;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface GrowthRecordRepository extends JpaRepository<GrowthRecord, Long> {


    Optional<GrowthRecord> findByRecordId(Long recordId);

    @Query(value = "select gr from GrowthRecord gr " +
            "where gr.folder.folderId = :folderId " +
            "and gr.isDelete is false ")
    List<GrowthRecord> getGrowthRecords(Long folderId);

    @Modifying
    @Transactional
    @Query(value = "update GrowthRecord gr " +
            "set gr.title = :#{#growthRecord.title}, " +
            "gr.content = :#{#growthRecord.content}," +
            "gr.date = :#{#growthRecord.date}, " +
            "gr.imageName = :#{#growthRecord.imageName}, " +
            "gr.imageUrl = :#{#growthRecord.imageUrl} " +
            "where gr.recordId = :#{#growthRecord.recordId} ")
    void updateGrowthRecord(@Param("growthRecord") GrowthRecord growthRecord);

    @Modifying
    @Transactional
    @Query(value = "update GrowthRecord gr " +
            "set gr.isDelete = true " +
            "where gr.recordId = :recordId ")
    void deleteGrowthRecord(Long recordId);


}

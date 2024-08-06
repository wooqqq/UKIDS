package com.modernfamily.ukids.domain.schedule.model.repository;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.schedule.entity.QSchedule;
import com.modernfamily.ukids.domain.schedule.entity.Schedule;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
public class ScheduleRepositoryImpl implements ScheduleRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    private QSchedule qSchedule = QSchedule.schedule;

    @Override
    public List<Schedule> findAllByFamilyIdAndDate(Family family, LocalDate date){
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

        return jpaQueryFactory.selectFrom(qSchedule)
                .where(qSchedule.family.eq(family)
                        .and(qSchedule.startTime.lt(endOfDay))
                        .and(qSchedule.endTime.ne(startOfDay)))
                .fetch();
    }

}

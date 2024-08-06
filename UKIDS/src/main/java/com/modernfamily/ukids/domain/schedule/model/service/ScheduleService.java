package com.modernfamily.ukids.domain.schedule.model.service;

import com.modernfamily.ukids.domain.schedule.dto.request.ScheduleCreateRequestDto;

public interface ScheduleService {
    void createSchedule(ScheduleCreateRequestDto requestDto);

}

package com.modernfamily.ukids.domain.schedule.model.service;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.family.model.repository.FamilyRepository;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.domain.schedule.dto.request.ScheduleCreateRequestDto;
import com.modernfamily.ukids.domain.schedule.entity.Schedule;
import com.modernfamily.ukids.domain.schedule.model.repository.ScheduleRepository;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final FamilyMemberRepository familyMemberRepository;

    @Transactional
    public void createSchedule(ScheduleCreateRequestDto requestDto) {
        Family family = checkFamilyMember(requestDto.getFamilyId());

        Schedule schedule = Schedule.createSchedule(requestDto, family);

        scheduleRepository.save(schedule);
    }


    private Family checkFamilyMember(Long familyId){
        String userId = CustomUserDetails.contextGetUserId();

        Family family = familyMemberRepository.findByUser_IdAndFamily_FamilyId(userId, familyId).orElseThrow(() ->
                new ExceptionResponse(CustomException.NOT_FOUND_FAMILYMEMBER_EXCEPTION)).getFamily();

        return family;
    }
}

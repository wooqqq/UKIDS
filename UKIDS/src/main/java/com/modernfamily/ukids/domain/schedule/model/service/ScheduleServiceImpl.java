package com.modernfamily.ukids.domain.schedule.model.service;

import com.modernfamily.ukids.domain.family.dto.FamilyResponseDto;
import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.family.mapper.FamilyMapper;
import com.modernfamily.ukids.domain.family.model.repository.FamilyRepository;
import com.modernfamily.ukids.domain.familyMember.model.repository.FamilyMemberRepository;
import com.modernfamily.ukids.domain.schedule.dto.request.ScheduleCreateRequestDto;
import com.modernfamily.ukids.domain.schedule.dto.request.ScheduleUpdateRequestDto;
import com.modernfamily.ukids.domain.schedule.dto.response.ScheduleInfoResponseDto;
import com.modernfamily.ukids.domain.schedule.entity.Schedule;
import com.modernfamily.ukids.domain.schedule.model.repository.ScheduleRepository;
import com.modernfamily.ukids.domain.user.dto.CustomUserDetails;
import com.modernfamily.ukids.domain.user.mapper.UserMapper;
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
    private final FamilyMapper familyMapper;
    private final UserMapper userMapper;

    @Transactional
    public void createSchedule(ScheduleCreateRequestDto requestDto) {
        Family family = checkFamilyMember(requestDto.getFamilyId());

        Schedule schedule = Schedule.createSchedule(requestDto.getTitle(), requestDto.getContent(), requestDto.getPlace(),
                requestDto.getStartTime(), requestDto.getEndTime() ,family);

        scheduleRepository.save(schedule);
    }

    @Transactional
    public void updateSchedule(ScheduleUpdateRequestDto requestDto) {
        Family family = checkFamilyMember(requestDto.getFamilyId());

        Schedule existSchedule = scheduleRepository.findByScheduleId(requestDto.getScheduleId())
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_SCHEDULE_EXCEPTION));

        if(!existSchedule.getFamily().getFamilyId().equals(requestDto.getFamilyId()))
            throw new ExceptionResponse(CustomException.NOT_MATCHED_SCHEDULE_FAMILY);

        Schedule schedule = Schedule.createSchedule(requestDto.getTitle(), requestDto.getContent(), requestDto.getPlace(),
                requestDto.getStartTime(), requestDto.getEndTime() ,family);

        schedule.updateSchedule(requestDto.getScheduleId());

        scheduleRepository.save(schedule);
    }

    @Transactional
    public void deleteSchedule(Long scheduleId) {
        Schedule existSchedule = scheduleRepository.findByScheduleId(scheduleId)
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_SCHEDULE_EXCEPTION));

        checkFamilyMember(existSchedule.getFamily().getFamilyId());

        existSchedule.deleteSchedule();

        scheduleRepository.save(existSchedule);
    }

    public ScheduleInfoResponseDto getScheduleInfo(Long scheduleId) {
        Schedule existSchedule = scheduleRepository.findByScheduleId(scheduleId)
                .orElseThrow(()-> new ExceptionResponse(CustomException.NOT_FOUND_SCHEDULE_EXCEPTION));

        Family family = checkFamilyMember(existSchedule.getFamily().getFamilyId());

        FamilyResponseDto familyResponseDto = familyMapper.toFamilyResponseDto(family);
        familyResponseDto.setUserFamilyDto(userMapper.toUserFamilyDto(existSchedule.getFamily().getUser()));

        return ScheduleInfoResponseDto.createResponseDto(existSchedule, familyResponseDto);
    }

    private Family checkFamilyMember(Long familyId){
        String userId = CustomUserDetails.contextGetUserId();

        Family family = familyMemberRepository.findByUser_IdAndFamily_FamilyId(userId, familyId).orElseThrow(() ->
                new ExceptionResponse(CustomException.NOT_FOUND_FAMILYMEMBER_EXCEPTION)).getFamily();

        return family;
    }
}

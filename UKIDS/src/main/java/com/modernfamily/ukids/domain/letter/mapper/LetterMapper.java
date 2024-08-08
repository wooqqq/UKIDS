package com.modernfamily.ukids.domain.letter.mapper;

import com.modernfamily.ukids.domain.letter.dto.request.LetterCreateRequestDto;
import com.modernfamily.ukids.domain.letter.entity.Letter;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LetterMapper {
    LetterMapper INSTANCE = Mappers.getMapper(LetterMapper.class);

    Letter toCreateEntity(LetterCreateRequestDto letterDto);
}

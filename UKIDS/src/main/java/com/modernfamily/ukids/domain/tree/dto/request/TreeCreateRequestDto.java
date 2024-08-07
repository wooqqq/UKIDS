package com.modernfamily.ukids.domain.tree.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TreeCreateRequestDto {

    @NotNull
    private Long familyId;
}

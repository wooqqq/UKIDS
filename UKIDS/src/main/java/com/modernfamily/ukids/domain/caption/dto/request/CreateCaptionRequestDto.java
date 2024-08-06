package com.modernfamily.ukids.domain.caption.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jdk.jfr.Name;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateCaptionRequestDto {

    @NotBlank
    private String content;

    @NotNull
    private Long photoId;

}

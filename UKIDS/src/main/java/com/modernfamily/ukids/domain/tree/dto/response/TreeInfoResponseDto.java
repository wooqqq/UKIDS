package com.modernfamily.ukids.domain.tree.dto.response;

import com.modernfamily.ukids.domain.tree.entity.TreeType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TreeInfoResponseDto {

    private Long treeId;

    private Long exp;

    private boolean isComplete;

    private TreeType treeType;

    private Long familyId;

}

package com.modernfamily.ukids.domain.tree.dto;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.tree.entity.TreeType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TreeDto {

    private Long treeId;
    private Long exp = 0L;
    private Long point = 0L;
    private boolean isComplete = false;
    private TreeType treeType;
    private Family family;
    private Long familyId;
}

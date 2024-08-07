package com.modernfamily.ukids.domain.tree.model.service;

import com.modernfamily.ukids.domain.tree.dto.TreeDto;
import com.modernfamily.ukids.domain.tree.entity.Tree;

public interface TreeService {

    Tree save(TreeDto treeDto);

    Tree findByFamilyId(Long familyId);

    Tree updateTree(TreeDto treeDto);
}

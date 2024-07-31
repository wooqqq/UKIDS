package com.modernfamily.ukids.domain.tree.model.service;

import com.modernfamily.ukids.domain.family.entity.Family;
import com.modernfamily.ukids.domain.family.repository.FamilyRepository;
import com.modernfamily.ukids.domain.tree.dto.TreeDto;
import com.modernfamily.ukids.domain.tree.entity.Tree;
import com.modernfamily.ukids.domain.tree.mapper.TreeMapper;
import com.modernfamily.ukids.domain.tree.model.repository.TreeRepository;
import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import org.springframework.stereotype.Service;

@Service
public class TreeServiceImpl implements TreeService {

    private TreeRepository treeRepository;
    private FamilyRepository familyRepository;
    private TreeMapper treeMapper;

    public TreeServiceImpl(TreeRepository treeRepository, FamilyRepository familyRepository) {
        this.treeRepository = treeRepository;
        this.familyRepository = familyRepository;
    }

    @Override
    public Tree save(TreeDto treeDto) {
        // familyId로 Family 엔티티 조회
        Family family = familyRepository.findById(treeDto.getFamilyId())
                .orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_FAMILY_EXCEPTION));

        Tree tree = new Tree();
        tree.setFamily(family);
        return treeRepository.save(tree);
    }

}

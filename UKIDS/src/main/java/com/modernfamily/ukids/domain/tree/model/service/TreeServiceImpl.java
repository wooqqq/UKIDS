package com.modernfamily.ukids.domain.tree.model.service;

import com.modernfamily.ukids.domain.tree.model.repository.TreeRepository;
import org.springframework.stereotype.Service;

@Service
public class TreeServiceImpl implements TreeService {

    private TreeRepository treeRepository;

    public TreeServiceImpl(TreeRepository treeRepository) {
        this.treeRepository = treeRepository;
    }

}

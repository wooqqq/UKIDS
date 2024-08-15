package com.modernfamily.ukids.domain.letter.model.repository;

import com.modernfamily.ukids.domain.letter.entity.Letter;
import com.modernfamily.ukids.domain.tree.entity.Tree;
import com.modernfamily.ukids.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Long>, LetterRepositoryCustom {
    Optional<Letter> findByLetterId(Long letterId);

    List<Letter> findAllByFromUser(User fromUser);

    Page<Letter> findByToUserAndIsOpen(User toUser, boolean isOpen, Pageable pageable);

    Page<Letter> findByFromUser(User fromUser, Pageable pageable);

    long countByTree_TreeId(Long treeId);

    long countByToUser(User toUser);

    long countByToUserAndIsRead(User toUser, boolean isRead);

    @Override
    long updateLettersOpenStatusByTree(Tree tree);


}
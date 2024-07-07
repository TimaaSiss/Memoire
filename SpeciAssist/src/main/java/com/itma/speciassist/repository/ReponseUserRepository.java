package com.itma.speciassist.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itma.speciassist.model.ReponseUser;

import java.util.List;

@Repository
public interface ReponseUserRepository extends JpaRepository<ReponseUser, Integer> {
    List<ReponseUser> findByUser_Id(Integer userId, Sort tri);
    List<ReponseUser> findByQuestion_Id(Integer questionId);
}

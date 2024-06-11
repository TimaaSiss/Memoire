package com.itma.speciassist.repository;

import com.itma.speciassist.model.VideoMentor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoMentorRepository extends JpaRepository<VideoMentor, Long> {
    List<VideoMentor> findByCarriereId(Long carriereId);
}
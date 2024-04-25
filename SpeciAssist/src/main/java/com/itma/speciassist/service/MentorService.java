package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.Mentor;

public interface MentorService {
    Mentor addMentor(Mentor mentor);
    List<Mentor> getAllMentors();
    Mentor getMentorById(Integer id);
    Mentor updateMentor(Integer id, Mentor mentor);
    void deleteMentor(Integer id);
}

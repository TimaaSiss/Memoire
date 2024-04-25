package com.itma.speciassist.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itma.speciassist.model.Mentor;
import com.itma.speciassist.repository.MentorRepository;
import com.itma.speciassist.service.MentorService;

@Service
public class MentorServiceImpl implements MentorService {

    @Autowired
    private MentorRepository mentorRepository;

    @Override
    public Mentor addMentor(Mentor mentor) {
        return mentorRepository.save(mentor);
    }

    @Override
    public List<Mentor> getAllMentors() {
        return mentorRepository.findAll();
    }

    @Override
    public Mentor getMentorById(Integer id) {
        return mentorRepository.findById(id).orElse(null);
    }

    @Override
    public Mentor updateMentor(Integer id, Mentor mentor) {
        if (!mentorRepository.existsById(id)) {
            return null;
        }
        mentor.setId(id);
        return mentorRepository.save(mentor);
    }

    @Override
    public void deleteMentor(Integer id) {
        mentorRepository.deleteById(id);
    }
}

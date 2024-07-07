package com.itma.speciassist.service.impl;

import java.nio.CharBuffer;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.itma.speciassist.model.Mentor;
import com.itma.speciassist.repository.MentorRepository;
import com.itma.speciassist.service.MentorService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MentorServiceImpl implements MentorService {

    private MentorRepository mentorRepository;
    private PasswordEncoder passwordEncoder;

    @Override
    public Mentor addMentor(Mentor mentor) {
    	 if (mentor.getPassword() == null) {
             throw new IllegalArgumentException("rawPassword cannot be null");
         }
    	 String encodedPassword = passwordEncoder.encode(mentor.getPassword());
         mentor.setPassword(encodedPassword);
         
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

package com.itma.speciassist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itma.speciassist.model.Mentor;
import com.itma.speciassist.service.MentorService;

@RestController
@RequestMapping("/mentors")
public class MentorController {

    @Autowired
    private MentorService mentorService;

    @PostMapping()
    public Mentor addMentor(@RequestBody Mentor mentor) {
        return mentorService.addMentor(mentor);
    }

    @GetMapping()
    public List<Mentor> getAllMentors() {
        return mentorService.getAllMentors();
    }

    @GetMapping("/{id}")
    public Mentor getMentorById(@PathVariable Integer id) {
        return mentorService.getMentorById(id);
    }

    @PutMapping("/{id}")
    public Mentor updateMentor(@PathVariable Integer id, @RequestBody Mentor mentor) {
        return mentorService.updateMentor(id, mentor);
    }

    @DeleteMapping("/{id}")
    public void deleteMentor(@PathVariable Integer id) {
        mentorService.deleteMentor(id);
    }
}

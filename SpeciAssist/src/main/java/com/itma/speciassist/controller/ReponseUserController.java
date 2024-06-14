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

import com.itma.speciassist.model.ReponseUser;
import com.itma.speciassist.service.ReponseUserService;

@RestController
@RequestMapping("/reponses")
public class ReponseUserController {

    @Autowired
    private ReponseUserService reponseService;

    @PostMapping("/add")
    public ReponseUser addReponse(@RequestBody ReponseUser reponse) {
        return reponseService.addReponse(reponse);
    }

    @GetMapping()
    public List<ReponseUser> getAllReponses() {
        return reponseService.getAllReponses();
    }

    @GetMapping("/{id}")
    public ReponseUser getReponseById(@PathVariable Integer id) {
        return reponseService.getReponseById(id);
    }

    @GetMapping("/user/{userId}")
    public List<ReponseUser> getReponsesByUserId(@PathVariable Integer userId) {
        return reponseService.getReponsesByUserId(userId);
    }

    @GetMapping("/{questionId}")
    public List<ReponseUser> getReponsesByQuestionId(@PathVariable Integer questionId) {
        return reponseService.getReponsesByQuestionId(questionId);
    }

    @PutMapping("/{id}")
    public ReponseUser updateReponse(@PathVariable Integer id, @RequestBody ReponseUser reponse) {
        return reponseService.updateReponse(id, reponse);
    }

    @DeleteMapping("/{id}")
    public void deleteReponse(@PathVariable Integer id) {
        reponseService.deleteReponse(id);
    }
}

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
        // Prétraiter la réponse textuelle et choisie
        if (reponse.getReponseTextuelle() != null) {
            String preprocessedText = reponseService.preprocessText(reponse.getReponseTextuelle());
            reponse.setReponseTextuelle(preprocessedText);
        }
        if (reponse.getReponseChoisie() != null) {
            String preprocessedChoice = reponseService.preprocessText(reponse.getReponseChoisie());
            reponse.setReponseChoisie(preprocessedChoice);
        }

        return reponseService.addReponse(reponse);
    }

    @GetMapping("/all")
    public List<ReponseUser> getAllReponses() {
        List<ReponseUser> reponses = reponseService.getAllReponses();
        return reponseService.preprocessReponses(reponses);
    }

    @GetMapping("/{id}")
    public ReponseUser getReponseById(@PathVariable Integer id) {
        ReponseUser reponse = reponseService.getReponseById(id);
        if (reponse != null && reponse.getReponseTextuelle() != null) {
            reponse.setReponseTextuelle(reponseService.preprocessText(reponse.getReponseTextuelle()));
        }
        if (reponse != null && reponse.getReponseChoisie() != null) {
            reponse.setReponseChoisie(reponseService.preprocessText(reponse.getReponseChoisie()));
        }
        return reponse;
    }

    @GetMapping("/user/{userId}")
    public List<ReponseUser> getReponsesByUserId(@PathVariable Integer userId) {
        List<ReponseUser> reponses = reponseService.getReponsesByUserId(userId);
        return reponseService.preprocessReponses(reponses);
    }

    @GetMapping("/question/{questionId}")
    public List<ReponseUser> getReponsesByQuestionId(@PathVariable Integer questionId) {
        List<ReponseUser> reponses = reponseService.getReponsesByQuestionId(questionId);
        return reponseService.preprocessReponses(reponses);
    }

    @PutMapping("/{id}")
    public ReponseUser updateReponse(@PathVariable Integer id, @RequestBody ReponseUser reponse) {
        // Prétraiter la réponse textuelle et choisie
        if (reponse.getReponseTextuelle() != null) {
            String preprocessedText = reponseService.preprocessText(reponse.getReponseTextuelle());
            reponse.setReponseTextuelle(preprocessedText);
        }
        if (reponse.getReponseChoisie() != null) {
            String preprocessedChoice = reponseService.preprocessText(reponse.getReponseChoisie());
            reponse.setReponseChoisie(preprocessedChoice);
        }

        return reponseService.updateReponse(id, reponse);
    }

    @DeleteMapping("/{id}")
    public void deleteReponse(@PathVariable Integer id) {
        reponseService.deleteReponse(id);
    }
}

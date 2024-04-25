package com.itma.speciassist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itma.speciassist.model.ReponseQuestion;
import com.itma.speciassist.service.ReponseQuestionService;

@RestController
@RequestMapping("/reponsesQ")
public class ReponseQuestionController {
    
    @Autowired
    private ReponseQuestionService reponseQuestionService;

    @GetMapping("/{id}")
    public ReponseQuestion getReponseById(@PathVariable Integer id) {
        return reponseQuestionService.getReponseById(id);
    }

    @PostMapping("/add")
    public ReponseQuestion addReponse(@RequestBody ReponseQuestion reponse) {
        return reponseQuestionService.addReponse(reponse);
    }

    @PutMapping("/{id}")
    public ReponseQuestion updateReponse(@PathVariable Integer id, @RequestBody ReponseQuestion reponse) {
        return reponseQuestionService.updateReponse(id, reponse);
    }

    @DeleteMapping("/{id}")
    public void deleteReponse(@PathVariable Integer id) {
        reponseQuestionService.deleteReponse(id);
    }
}

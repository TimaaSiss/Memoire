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

    @GetMapping("/getReponse/{id}")
    public ReponseQuestion getReponseById(@PathVariable String id) {
        return reponseQuestionService.getReponseById(id);
    }

    @PostMapping("/add")
    public ReponseQuestion addReponse(@RequestBody ReponseQuestion reponse) {
        return reponseQuestionService.addReponse(reponse);
    }

    @PutMapping("/update/{id}")
    public ReponseQuestion updateReponse(@PathVariable String id, @RequestBody ReponseQuestion reponse) {
        return reponseQuestionService.updateReponse(id, reponse);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteReponse(@PathVariable String id) {
        reponseQuestionService.deleteReponse(id);
    }
}

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

import com.itma.speciassist.model.Commentaire;
import com.itma.speciassist.service.CommentaireService;

@RestController
@RequestMapping("/commentaires")
public class CommentaireController {

    @Autowired
    private CommentaireService commentaireService;

    @GetMapping("/{id}")
    public Commentaire getCommentaireById(@PathVariable Integer id) {
        return commentaireService.getCommentaire(id);
    }

    
    @GetMapping()
    public List<Commentaire> getAllCommentaires() {
        return commentaireService.getAllCommentaires();
    }

    @PostMapping()
    public Commentaire addCommentaire(@RequestBody Commentaire commentaire) {
        return commentaireService.addCommentaire(commentaire);
    }

    @PutMapping("/{id}")
    public Commentaire updateCommentaire(@PathVariable Integer id, @RequestBody Commentaire commentaire) {
        return commentaireService.updateCommentaire(id, commentaire);
    }

    @DeleteMapping("/{id}")
    public void deleteCommentaire(@PathVariable Integer id) {
        commentaireService.deleteCommentaire(id);
    }
   
}
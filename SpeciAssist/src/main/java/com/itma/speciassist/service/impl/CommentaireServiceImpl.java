package com.itma.speciassist.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itma.speciassist.model.Commentaire;
import com.itma.speciassist.repository.CommentaireRepository;
import com.itma.speciassist.service.CommentaireService;

@Service
public class CommentaireServiceImpl implements CommentaireService {

    @Autowired
    private CommentaireRepository commentaireRepository;

    @Override
    public Commentaire getCommentaire(Integer id) {
        Optional<Commentaire> optionalCommentaire = commentaireRepository.findById(id);
        return optionalCommentaire.orElse(null);
    }

    @Override
    public List<Commentaire> getAllCommentaires() {
        return commentaireRepository.findAll();
    }

    @Override
    public Commentaire addCommentaire(Commentaire commentaire) {
        return commentaireRepository.save(commentaire);
    }

    @Override
    public Commentaire updateCommentaire(Integer id, Commentaire newCommentaire) {
        Optional<Commentaire> optionalCommentaire = commentaireRepository.findById(id);
        if (optionalCommentaire.isPresent()) {
            Commentaire existingCommentaire = optionalCommentaire.get();
            existingCommentaire.setContenu(newCommentaire.getContenu());
            existingCommentaire.setDatePublication(newCommentaire.getDatePublication());
            return commentaireRepository.save(existingCommentaire);
        }
        return null;
    }
    
    @Override
    public List<Commentaire> getCommentairesByCarriereId(Integer carriereId) {
        return commentaireRepository.findByCarriereId(carriereId);
    }

    

    @Override
    public void deleteCommentaire(Integer id) {
        commentaireRepository.deleteById(id);
    }

	

	
}

package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.Commentaire;

public interface CommentaireService {
    Commentaire getCommentaire(Integer id);

    List<Commentaire> getAllCommentaires();

    

    Commentaire updateCommentaire(Integer id, Commentaire commentaire);

    void deleteCommentaire(Integer id);

	Commentaire addCommentaire(Commentaire commentaire);

	List<Commentaire> getCommentairesByCarriereId(Integer carriereId);

	
}



	

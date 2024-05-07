package com.itma.speciassist.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private Long id;

    private String libelle;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    @JoinColumn(name = "questionnaire_id")
    private Questionnaire questionnaire;

   
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ReponseQuestion> reponseQuestions = new ArrayList<>();

   

    // Supprimer ou laisser cette méthode vide si elle n'est pas utilisée
    public void setUser(User user) {
        // Ne fait rien
    }

	public User getUser() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setQuestions(Object object) {
		// TODO Auto-generated method stub
		
	}
}

package com.itma.speciassist.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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

   
    @ManyToMany(mappedBy = "questions")
    List<ReponseQuestion> reponse_questions;


	public User getUser() {
		// TODO Auto-generated method stub
		return null;
	}


	public void setUser(User user) {
		// TODO Auto-generated method stub
		
	}
   
}

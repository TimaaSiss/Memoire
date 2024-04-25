package com.itma.speciassist.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class ReponseQuestion {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer id;
	    private String contenu;
	    
	    @ManyToMany(
	    		fetch = FetchType.LAZY,
	    			cascade = { 
	    					CascadeType.PERSIST, 
	    					CascadeType.MERGE 
	    					}	
	    			)
	    @JoinTable(
				name = "reponse_question_questions",
				joinColumns = @JoinColumn(name = "reponse_question_id"), 	
				inverseJoinColumns = @JoinColumn(name = "question_id")
		)
		private List<Question> questions = new ArrayList<>();	

}

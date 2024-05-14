package com.itma.speciassist.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Questionnaire {
	 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    
    @OneToMany(mappedBy = "questionnaire", cascade = CascadeType.ALL)
   // @JsonIgnore
    private List<Question> questions;
   
    @ManyToOne 
    
    private User user;
   
	public User getUser() {
		// TODO Auto-generated method stub
		 return this.user;
	}

	
   
}

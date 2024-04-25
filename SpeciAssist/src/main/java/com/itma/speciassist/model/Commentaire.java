package com.itma.speciassist.model;

import java.time.LocalDateTime;
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
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String contenu;
    private LocalDateTime datePublication;

    @ManyToMany(
    		fetch = FetchType.LAZY,
    			cascade = { 
    					CascadeType.PERSIST, 
    					CascadeType.MERGE 
    					}	
    			)
    @JoinTable(
			name = "commentaire_user",
			joinColumns = @JoinColumn(name = "commentaire_id"), 	
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private List<User> users = new ArrayList<>();	

    
    
	
}

   

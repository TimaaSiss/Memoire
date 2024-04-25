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
public class Mentor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String prenom;
    private String username;
    private String mail;
    private String password;
    private String specialite;

  
    
    @ManyToMany(
    		fetch = FetchType.LAZY,
    			cascade = { 
    					CascadeType.PERSIST, 
    					CascadeType.MERGE 
    					}	
    			)
    @JoinTable(
			name = "mentor_user",
			joinColumns = @JoinColumn(name = "mentor_id"), 	
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private List<User> users = new ArrayList<>();	

    
    @ManyToMany(
    		fetch = FetchType.LAZY,
    			cascade = { 
    					CascadeType.PERSIST, 
    					CascadeType.MERGE 
    					}	
    			)
    @JoinTable(
			name = "mentor_etablissement",
			joinColumns = @JoinColumn(name = "mentor_id"), 	
			inverseJoinColumns = @JoinColumn(name = "etablissement_id")
	)
	private List<Etablissement> etablissements = new ArrayList<>();	
}

   


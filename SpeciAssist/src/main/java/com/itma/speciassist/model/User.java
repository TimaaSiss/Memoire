package com.itma.speciassist.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String prenom;
    private String username;
    private String mail;
    private String password;
    
    private Role role; // Modification de l'attribut de rôle pour utiliser l'énumération
    
    @ManyToMany(mappedBy = "users")
    List<Mentor> mentors;
    
    @ManyToMany(mappedBy = "users")
    List<Commentaire> commentaires;
    

   
	public void setQuestions(Object object) {
		// TODO Auto-generated method stub
		
	}
}

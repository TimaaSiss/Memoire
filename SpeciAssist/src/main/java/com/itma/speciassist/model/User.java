package com.itma.speciassist.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor 
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String prenom;
    private String username;
    private String mail;
    private String token;
    @NotEmpty(message = "Le champ du mot de passe ne peut pas être vide")
    private String password;
    private String confirmPassword; // Champ de confirmation du mot de passe
    
    private boolean status;

    private Role role; // Modification de l'attribut de rôle pour utiliser l'énumération

    

    @ManyToMany(mappedBy = "users")
    List<Commentaire> commentaires;

	public void setQuestions(Object object) {
		// TODO Auto-generated method stub
		
	}

	public Object getConfirmPassword() {
		// TODO Auto-generated method stub
		return null;
	}

	public User(Integer id2, String username2, Object name) {
		// TODO Auto-generated constructor stub
	}

	
    
  
}

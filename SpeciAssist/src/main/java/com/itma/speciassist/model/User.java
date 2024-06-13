package com.itma.speciassist.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor 
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String prenom;
    @Column(unique = true)
    private String username;
    private String mail;
    @Transient
    private String token;

    @NotEmpty(message = "Le champ du mot de passe ne peut pas être vide")
    private String password;
  
    private boolean status;

    private Role role; // Modification de l'attribut de rôle pour utiliser l'énumération

   

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

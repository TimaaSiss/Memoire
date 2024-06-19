package com.itma.speciassist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Cours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String titre;
    private String description;
    private String duree;
    private String urlCours;
    private String niveau;
    
    @ManyToOne
    @JoinColumn(name = "utilisateur_id") // Nom de la colonne pour la clé étrangère vers User
    private User user;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "mentor_id") // Nom de la colonne pour la clé étrangère vers Mentor
    private Mentor mentor;
    
    @ManyToOne
    @JoinColumn(name = "formation_id")
    private Formation formation;  // Référence à la formation associée

    // Getters and setters

    public Integer getMentorId() {
        if (mentor != null) {
            return mentor.getId(); // Retourne l'ID du mentor associé au cours
        }
        return null;
    }
}

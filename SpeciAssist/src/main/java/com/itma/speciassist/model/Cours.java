package com.itma.speciassist.model;

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
    @JoinColumn(name = "utilisateur_id") // Nom de la colonne pour la clé étrangère
    private User user;
    
   
}
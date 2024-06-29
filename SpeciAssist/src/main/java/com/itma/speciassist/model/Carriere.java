package com.itma.speciassist.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Carriere {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String description;
    private String secteur;
    private String competences_requises;
    private String salaire;
    private String image;

    @JsonIgnoreProperties("carriere")
    @OneToMany(mappedBy = "carriere", cascade = CascadeType.ALL)
    private List<Commentaire> commentaires = new ArrayList<>();
    
    @JsonIgnore
    @ManyToMany
    @JoinTable(
        name = "carriere_formation",
        joinColumns = @JoinColumn(name = "carriere_id"),
        inverseJoinColumns = @JoinColumn(name = "formation_id")
    )
    private List<Formation> formations = new ArrayList<>();
    

}

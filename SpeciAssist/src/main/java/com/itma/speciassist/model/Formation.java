package com.itma.speciassist.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String titre;
    private String description;
    private String duree;
    private double prix;
    private String contenu;
    private String image;
    
    @JsonIgnore
    @OneToMany(mappedBy = "formation")
    private List<Cours> cours;
    
    
   
    @ManyToMany
    @JoinTable(
        name = "formation_etablissement",
        joinColumns = @JoinColumn(name = "formation_id"),
        inverseJoinColumns = @JoinColumn(name = "etablissement_id")
    )
    private List<Etablissement> etablissements;

    
    @ManyToMany
    @JoinTable(
        name = "formation_carriere",
        joinColumns = @JoinColumn(name = "formation_id"),
        inverseJoinColumns = @JoinColumn(name = "carriere_id"))
    private List<Carriere> carrieres;
	public Object getFormationWithEtablissementsByTitre() {
		// TODO Auto-generated method stub
		return null;
	}
}

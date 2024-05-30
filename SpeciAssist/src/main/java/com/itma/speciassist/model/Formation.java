package com.itma.speciassist.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
    
    @ManyToMany
    @JoinTable(
        name = "formation_etablissement",
        joinColumns = @JoinColumn(name = "formation_id"),
        inverseJoinColumns = @JoinColumn(name = "etablissement_id")
    )
    private List<Etablissement> etablissements;

	public Object getFormationWithEtablissementsByTitre() {
		// TODO Auto-generated method stub
		return null;
	}
}

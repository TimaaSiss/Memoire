package com.itma.speciassist.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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
    private Integer mentorId;
    
    @JsonIgnoreProperties("carriere")
    @OneToMany(mappedBy = "carriere", cascade = CascadeType.ALL)
    private List<Commentaire> commentaires = new ArrayList<>();
    
    
    @ManyToMany(mappedBy = "carrieres",cascade= CascadeType.REMOVE)
    @JsonIgnore
    private List<Formation> formations = new ArrayList<>();
    

}
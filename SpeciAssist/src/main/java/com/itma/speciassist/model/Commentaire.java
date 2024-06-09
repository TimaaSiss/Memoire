package com.itma.speciassist.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String contenu;
    private LocalDate datePublication;

    @ManyToOne
    @JoinColumn(name = "carriere_id")
    @JsonIgnoreProperties("commentaires")
    private Carriere carriere;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

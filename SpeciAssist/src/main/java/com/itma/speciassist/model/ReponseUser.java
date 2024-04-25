package com.itma.speciassist.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class ReponseUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String reponseTextuelle;
    private String reponseChoisie;
    private LocalDate date;
    
    @ManyToOne
    private User user;

    @ManyToOne
    private Question question;

   
}

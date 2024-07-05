package com.itma.speciassist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class VideoMentor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;
    private String fileName;
    private String title;
    
    
    @ManyToOne
    @JoinColumn(name = "mentor_id", nullable = false)
    @JsonIgnore
    private Mentor mentor;

    @ManyToOne
    @JoinColumn(name = "carriere_id")
    private Carriere carriere;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

   
}

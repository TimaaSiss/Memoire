package com.itma.speciassist.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Mentor extends User {
    private String specialite;
    private Long carriereId; 
    
    @ManyToMany(mappedBy = "mentors")
    private List<Cours> cours;
    
    @OneToMany(mappedBy = "mentor")
    private List<VideoMentor> videoMentors;
}

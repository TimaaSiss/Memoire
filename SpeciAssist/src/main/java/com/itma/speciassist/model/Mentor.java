package com.itma.speciassist.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Mentor extends User {
    private String specialite;
    private Long carriereId; 
    
    @JsonIgnore  @OneToMany(mappedBy = "mentor")
    private List<Cours> cours;
    
    @JsonIgnore
    @OneToMany(mappedBy = "mentor")
    private List<VideoMentor> videoMentors;

	
}

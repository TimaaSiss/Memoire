package com.itma.speciassist.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "reponses_openai")
public class ReponseOpenAI {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private User user;

    @Column(name = "reponse_api")
    private String reponseAPI;

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}

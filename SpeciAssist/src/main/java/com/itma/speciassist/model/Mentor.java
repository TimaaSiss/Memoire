package com.itma.speciassist.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Mentor extends User {
    private String specialite;
}

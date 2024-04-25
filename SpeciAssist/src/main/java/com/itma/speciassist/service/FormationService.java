package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.Formation;

public interface FormationService {
    List<Formation> getAllFormations();

    Formation getFormationById(Integer id);

    Formation createFormation(Formation formation);

    Formation updateFormation(Integer id, Formation formation);

    void deleteFormation(Integer id);
}

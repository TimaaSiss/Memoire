package com.itma.speciassist.service;

import java.util.List;
import java.util.Optional;

import com.itma.speciassist.model.Formation;

public interface FormationService {
    List<Formation> getAllFormations();

    Formation getFormationById(Integer id);

    Formation createFormation(Formation formation);

    Formation updateFormation(Integer id, Formation formation);

    void deleteFormation(Integer id);

	Formation getFormationByTitre(String titre);
	 Optional<Formation> getFormationWithEtablissementsByTitre(String titre);


	//Optional<Formation> getFormationWithEtablissements(Long id);

	Optional<Formation> getFormationWithEtablissements(Integer id);
}

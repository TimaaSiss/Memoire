package com.itma.speciassist.service;

import java.util.List;
import java.util.Optional;

import com.itma.speciassist.model.Etablissement;
import com.itma.speciassist.model.Formation;

public interface FormationService {
	List<Formation> getAllFormations();

	Formation getFormationById(Integer id);

	Formation createFormation(Formation formation);

	Formation updateFormation(Integer id, Formation formation);

	void deleteFormation(Integer id);

	Formation getFormationByTitre(String titre);

	List<Etablissement> getEtablissementsWithFormation(String titre);

	Object findById(Long formationId);

	long getFormationCount();

	// Optional<Formation> getFormationWithEtablissements(Long id);

	// List<Etablissement> getFormationWithEtablissements(Integer id);
}

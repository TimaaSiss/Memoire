package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.Carriere;
import com.itma.speciassist.model.Formation;

public interface CarriereService {

	Carriere getCarriere(Integer id);

	List<Carriere> allCarrieres();

	Carriere addCarriere(Carriere carriere);

	Carriere updateCarriere(Integer id, Carriere carriere);

	void deleteCarriere(Integer id);

	Carriere getCarriereByNom(String nom);

	List<Formation> getFormationByCarriere(Integer carriereId);

	long countCarrieres();

	

	List<Carriere> getCarrieresByFormation(Integer formationId);

	List<Formation> addFormations(Integer carriereId);

	List<Formation> addFormations(Integer carriereId, List<Formation> formations);
}

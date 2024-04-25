package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.Carriere;

public interface CarriereService {

	Carriere getCarriere(Integer id);

	List<Carriere> allCarrieres();

	Carriere addCarriere(Carriere carriere);

	Carriere updateCarriere(Integer id, Carriere carriere);

	void deleteCarriere(Integer id);

}

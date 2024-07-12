package com.itma.speciassist.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.itma.speciassist.model.Carriere;
import com.itma.speciassist.model.Formation;
import com.itma.speciassist.repository.CarriereRepository;
import com.itma.speciassist.repository.FormationRepository;
import com.itma.speciassist.service.CarriereService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CarriereServiceImpl implements CarriereService {

	@Autowired
	private CarriereRepository carriereRepository;

	@Autowired
	private FormationRepository formationRepository;

	@Override
	public Carriere addCarriere(Carriere carriere) {
		List<Formation> formations = formationRepository
				.findAllById(carriere.getFormations().stream().map(Formation::getId).collect(Collectors.toList()));
		carriere.setFormations(formations);
		return carriereRepository.save(carriere);
	}

	@Override
	public List<Carriere> allCarrieres() {
		return carriereRepository.findAll();
	}

	@Override
	public Carriere getCarriere(Integer id) {
		return carriereRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carriere not found with ID: " + id));
	}

	@Override
	public Carriere updateCarriere(Integer id, Carriere carriere) {
		if (!carriereRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Carriere not found with ID: " + id);
		}
		carriere.setId(id);
		List<Formation> formations = formationRepository
				.findAllById(carriere.getFormations().stream().map(Formation::getId).collect(Collectors.toList()));
		carriere.setFormations(formations);
		return carriereRepository.save(carriere);
	}

	@Override
	@Transactional
	public void deleteCarriere(Integer id) {
		Carriere carriere = carriereRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carriere not found with ID: " + id));

		// Remove associations with formations
		carriere.getFormations().clear();
		carriereRepository.save(carriere);

		// Now delete the carriere
		carriereRepository.delete(carriere);
	}

	public Carriere getCarriereByNom(String nom) {
		Optional<Carriere> carriere = carriereRepository.findByNom(nom);
		return carriere.orElse(null);
	}

	@Override
	public List<Formation> getFormationByCarriere(Integer carriereId) {
		Carriere carriere = carriereRepository.findById(carriereId).orElseThrow(null);

		return carriere.getFormations();
	}

	@Override
	public List<Carriere> getCarrieresByFormation(Integer formationId) {
		Formation formation = formationRepository.findById(formationId).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Formation not found with ID: " + formationId));

		return formation.getCarrieres();
	}

	@Override
	public long countCarrieres() {
		return carriereRepository.count();
	}

	@Override
	public List<Formation> addFormations(Integer carriereId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Formation> addFormations(Integer carriereId, List<Formation> formations) {

		Carriere carriere = carriereRepository.findAllById(carriereId).orElse(null);
		carriere.setFormations(formations);
		carriereRepository.save(carriere);
		return carriere.getFormations();

	}

}
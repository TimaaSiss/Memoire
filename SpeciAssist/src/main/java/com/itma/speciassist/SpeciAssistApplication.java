package com.itma.speciassist;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import com.itma.speciassist.model.Etablissement;
import com.itma.speciassist.model.Formation;
import com.itma.speciassist.repository.EtablissementRepository;
import com.itma.speciassist.service.EtablissementService;
import com.itma.speciassist.service.FormationService;
import com.itma.speciassist.service.impl.FormationServiceImpl;

@SpringBootApplication
@ComponentScan
public class SpeciAssistApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpeciAssistApplication.class, args);
	}
	
	
	@Bean
	public CommandLineRunner init (FormationServiceImpl formationService, EtablissementRepository etablissementService){
		return arg-> {
		//formationService.addEtab();
		
	};
	}
}

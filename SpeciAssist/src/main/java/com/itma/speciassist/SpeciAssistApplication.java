package com.itma.speciassist;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;

import com.itma.speciassist.repository.EtablissementRepository;
import com.itma.speciassist.service.impl.FormationServiceImpl;

@SpringBootApplication
@PropertySource("classpath:application.properties")
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

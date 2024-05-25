package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.Etablissement;

public interface EtablissementService {
    Etablissement addEtablissement(Etablissement etablissement);

    List<Etablissement> allEtablissements();

    Etablissement getEtablissement(Integer id);

    Etablissement updateEtablissement(Integer id, Etablissement etablissement);

    void deleteEtablissement(Integer id);

	Etablissement getEtablissementById(Integer etablissementId);
}

package com.springtp.springdatarest.modele;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:3000")
public interface VoitureRepo extends CrudRepository<Voiture, Long> {

    List<Voiture> findByMarque(String marque);
    List<Voiture> findByCouleur(String couleur);
    List<Voiture> findByAnnee(int annee);
}
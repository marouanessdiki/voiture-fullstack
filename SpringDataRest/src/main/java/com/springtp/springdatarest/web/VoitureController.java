package com.springtp.springdatarest.web;

import com.springtp.springdatarest.modele.Voiture;
import com.springtp.springdatarest.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/voitures")
@CrossOrigin(origins = "http://localhost:3000")
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;


    @GetMapping
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Voiture> getVoitureById(@PathVariable Long id) {
        return voitureRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - Créer une voiture
    @PostMapping
    public Voiture createVoiture(@RequestBody Voiture voiture) {
        return voitureRepo.save(voiture);
    }

    // PUT - Modifier une voiture
    @PutMapping("/{id}")
    public ResponseEntity<Voiture> updateVoiture(@PathVariable Long id, @RequestBody Voiture voiture) {
        return voitureRepo.findById(id)
                .map(existingVoiture -> {
                    voiture.setId(id);
                    return ResponseEntity.ok(voitureRepo.save(voiture));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - Supprimer une voiture
    @DeleteMapping("/{id}")
    public ResponseEntity<Voiture> deleteVoiture(@PathVariable Long id) {
        return voitureRepo.findById(id)
                .map(voiture -> {
                    voitureRepo.deleteById(id);
                    return ResponseEntity.ok(voiture);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
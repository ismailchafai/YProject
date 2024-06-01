package org.sid.springsecurity.service.impl.voitureServiceImpl;

import org.sid.springsecurity.bean.photo.ImageModule;
import org.sid.springsecurity.bean.voitureBean.AgenceLocation;
import org.sid.springsecurity.bean.voitureBean.CategorieVoiture;
import org.sid.springsecurity.bean.voitureBean.Voiture;
import org.sid.springsecurity.dao.voitureDao.VoitureDao;
import org.sid.springsecurity.service.facade.communService.ReservationService;
import org.sid.springsecurity.service.facade.voitureService.AgenceLocationService;
import org.sid.springsecurity.service.facade.voitureService.CategorieVoitureService;
import org.sid.springsecurity.service.facade.voitureService.VoitureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class VoitureServiceImpl implements VoitureService {
    @Autowired
    private VoitureDao voitureDao;
    @Autowired
    private CategorieVoitureService categorieVoitureService;

    @Autowired
    private AgenceLocationService agenceLocationService;

    @Autowired
    private ReservationService reservationService;

    @Override
    public int save(Voiture voiture) {
        try {
            if (voiture.getMatricule() == null) {
                return -1;
            }
            if (voitureDao.findByMatricule(voiture.getMatricule()) != null) {
                return -6;
            }

            if (voiture.getCategorieVoiture() == null) {
                return -2;
            }
            if (voiture.getAgenceLocation() == null) {
                return -3;
            } else if (voiture.getCategorieVoiture().getLibelle() == null && voiture.getAgenceLocation().getIceAgLoc() == null) {
                return -4;
            } else {
                CategorieVoiture categorieVoiture = categorieVoitureService.findByLibelle(voiture.getCategorieVoiture().getLibelle());
                AgenceLocation agenceLocation = agenceLocationService.findByiceAgLoc(voiture.getAgenceLocation().getIceAgLoc());
                voiture.setCategorieVoiture(categorieVoiture);
                voiture.setAgenceLocation(agenceLocation);
                voitureDao.save(voiture);
                return 1;
            }

        } catch (Exception e) {

            System.err.println("Erreur lors de la sauvegarde de la voiture : " + e.getMessage());
            e.printStackTrace();
            return -5;
        }
    }


    @Override
    public List<Voiture> findAll() {
        return voitureDao.findAll();
    }

    @Override
    public Voiture findByMatricule(String Matricule) {
        return voitureDao.findByMatricule(Matricule);
    }

    public List<Voiture> findVoitureByCategorieVoitureLibelleAndAgenceLocationUsername(String libelle, String username) {
        return voitureDao.findVoitureByCategorieVoitureLibelleAndAgenceLocationUsername(libelle, username);
    }

    @Override
    public List<Voiture> findByCouleur(String couleur) {
        return voitureDao.findByCouleur(couleur);
    }

    @Override
    public List<Voiture> findByBoitevitesse(String boiteVitesse) {
        return voitureDao.findByBoitevitesse(boiteVitesse);
    }

    @Override
    public List<Voiture> findByCategorieVoitureLibelle(String libelle) {
        return voitureDao.findByCategorieVoitureLibelle(libelle);
    }

    @Override
    public List<Voiture> findByNomModele(String nom) {
        return voitureDao.findByNomModele(nom);
    }

    @Override
    public List<Voiture> findByVille(String ville) {
        return voitureDao.findByVille(ville);
    }

    @Transactional
    @Override
    public int deleteByMatricule(String Matricule) {
        return voitureDao.deleteByMatricule(Matricule);
    }

    @Override
    public int update(Voiture voiture) {
        Voiture existingVoiture = findByMatricule(voiture.getMatricule());

        if (existingVoiture == null) {
            return -1;
        }

        try {
            if (voiture.getCategorieVoiture() == null || voiture.getAgenceLocation() == null) {
                return -2;
            }
            if (voiture.getCategorieVoiture().getLibelle() == null || voiture.getAgenceLocation().getIceAgLoc() == null) {
                return -3;
            }
            CategorieVoiture categorieVoiture = categorieVoitureService.findByLibelle(voiture.getCategorieVoiture().getLibelle());
            AgenceLocation agenceLocation = agenceLocationService.findByiceAgLoc(voiture.getAgenceLocation().getIceAgLoc());


            existingVoiture.setCouleur(voiture.getCouleur());
            existingVoiture.setImagePaths(voiture.getImagePaths());
            existingVoiture.setNbrPlace(voiture.getNbrPlace());
            existingVoiture.setKiloMetrage(voiture.getKiloMetrage());
            existingVoiture.setBoitevitesse(voiture.getBoitevitesse());
            existingVoiture.setAnnee(voiture.getAnnee());
            existingVoiture.setPrix(voiture.getPrix());
            existingVoiture.setVille(voiture.getVille());
            existingVoiture.setDateMisecirculation(voiture.getDateMisecirculation());
            existingVoiture.setDateAssurance(voiture.getDateAssurance());
            existingVoiture.setSateVisitetechnique(voiture.getSateVisitetechnique());
            existingVoiture.setCategorieVoiture(categorieVoiture);
            existingVoiture.setAgenceLocation(agenceLocation);
            existingVoiture.setNomModele(voiture.getNomModele());
            existingVoiture.setCarburant(voiture.getCarburant());
            existingVoiture.setPuissance(voiture.getPuissance());

            voitureDao.save(existingVoiture);

            return 1;

        } catch (Exception e) {
            System.err.println("Erreur lors de la mise à jour de la voiture : " + e.getMessage());
            e.printStackTrace();
            return -4;
        }
    }

    @Override
    public List<Voiture> findVoitureByNomModeleAndCategorieVoitureLibelle(String model, String libelle) {
        return voitureDao.findByNomModeleAndCategorieVoitureLibelle(model, libelle);
    }
}

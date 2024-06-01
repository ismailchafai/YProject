package org.sid.springsecurity.bean.voitureBean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;

import java.util.List;

@Entity
public class CategorieVoiture {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String libelle;

    private String images;

    public CategorieVoiture(String libelle, String images) {
        this.libelle = libelle;
        this.images = images;
    }

    public String getImagePaths() {
        return images;
    }

    public void setImagePaths(String imagePaths) {
        this.images = imagePaths;
    }


    @JsonIgnore
    @OneToMany(mappedBy = "categorieVoiture")
    private List<Voiture> voitures;

    public CategorieVoiture(String libelle) {
        this.libelle = libelle;
    }

    public CategorieVoiture() {
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public List<Voiture> getVoitures() {
        return voitures;
    }

    public void setVoitures(List<Voiture> voitures) {
        this.voitures = voitures;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}

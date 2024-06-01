package org.sid.springsecurity.bean.appartementBean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import javax.persistence.*;

import java.util.List;

@Entity
@Table(name = "categoriesAppartement")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategoriesAppartement {
    @Id  @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id= 0L;
    private String libelle;

    @JsonIgnore
    @OneToMany(mappedBy = "categoriesAppartement",cascade = CascadeType.REMOVE)
    private List<Appartement> appartement;

    private String images;

    public String getImagePaths() {
        return images;
    }

    public void setImagePaths(String imagePaths) {
        this.images = imagePaths;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public List<Appartement> getAppartement() {
        return appartement;
    }

    public void setAppartement(List<Appartement> appartement) {
        this.appartement = appartement;
    }

    public CategoriesAppartement( String libelle,String images) {
        this.libelle = libelle;
        this.images=images;
    }
    public CategoriesAppartement() {
    }
}

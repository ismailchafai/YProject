package org.sid.springsecurity.bean.voitureBean;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)

public abstract class Modele {
   @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String nomModele;
    private String Carburant;
    private int Puissance;
    private double prix ;

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public Modele() {
    }
    public Modele(Long id, String nom_modele, String carburant, int puissance) {
        this.id = id;
        this.nomModele = nomModele;
        Carburant = carburant;
        Puissance = puissance;
    }

    public String getNomModele() {
        return nomModele;
    }

    public void setNomModele(String nomModele) {
        this.nomModele = nomModele;
    }

    public String getCarburant() {
        return Carburant;
    }

    public void setCarburant(String carburant) {
        Carburant = carburant;
    }

    public int getPuissance() {
        return Puissance;
    }

    public void setPuissance(int puissance) {
        Puissance = puissance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

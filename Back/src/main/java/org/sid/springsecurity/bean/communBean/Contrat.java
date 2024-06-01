package org.sid.springsecurity.bean.communBean;

import javax.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Contrat {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idContrat;

    private int numContrat;
    private float prixHT;
    private float tva;
    private String modelePaiement;
    private int dureeRetard;
    private LocalDateTime dateSignature;
    private float rest;

    @OneToOne
    @JoinColumn(name = "location_id")
    private Location location;


    public Contrat() {
    }

    public Contrat( int numContrat, float prixHT, float tva, String modelePaiement, int dureeRetard, LocalDateTime dateSignature, float rest, Location location) {
        this.numContrat = numContrat;
        this.prixHT = prixHT;
        this.tva = tva;
        this.modelePaiement = modelePaiement;
        this.dureeRetard = dureeRetard;
        this.dateSignature = dateSignature;
        this.rest = rest;
        this.location = location;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Long getIdContrat() {
        return idContrat;
    }

    public void setIdContrat(Long idContrat) {
        this.idContrat = idContrat;
    }

    public int getNumContrat() {
        return numContrat;
    }

    public void setNumContrat(int numContrat) {
        this.numContrat = numContrat;
    }

    public float getPrixHT() {
        return prixHT;
    }

    public void setPrixHT(float prixHT) {
        this.prixHT = prixHT;
    }

    public float getTva() {
        return tva;
    }

    public void setTva(float tva) {
        this.tva = tva;
    }

    public String getModelePaiement() {
        return modelePaiement;
    }

    public void setModelePaiement(String modelePaiement) {
        this.modelePaiement = modelePaiement;
    }

    public int getDureeRetard() {
        return dureeRetard;
    }

    public void setDureeRetard(int dureeRetard) {
        this.dureeRetard = dureeRetard;
    }

    public LocalDateTime getDateSignature() {
        return dateSignature;
    }

    public void setDateSignature(LocalDateTime dateSignature) {
        this.dateSignature = dateSignature;
    }

    public float getRest() {
        return rest;
    }

    public void setRest(float rest) {
        this.rest = rest;
    }
}

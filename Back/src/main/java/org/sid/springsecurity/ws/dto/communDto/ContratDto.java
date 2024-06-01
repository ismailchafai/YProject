package org.sid.springsecurity.ws.dto.communDto;


import java.time.LocalDateTime;

public class ContratDto {
    private int numContrat;
    private float prixHT;
    private float tva;
    private String modelePaiement;
    private int dureeRetard;
    private LocalDateTime dateSignature;
    private float rest;
    private LocationDto location;

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

    public LocationDto getLocation() {
        return location;
    }

    public void setLocation(LocationDto location) {
        this.location = location;
    }
}

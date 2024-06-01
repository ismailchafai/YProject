package org.sid.springsecurity.ws.dto.voitureDto;

public abstract class ModeleDto {
    private Long id;
    private String nomModele;
    private String Carburant;
    private double prix;

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    private int Puissance;

    public Long getId() {

        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}

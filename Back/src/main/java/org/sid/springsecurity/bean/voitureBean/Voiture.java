package org.sid.springsecurity.bean.voitureBean;

import org.sid.springsecurity.bean.communBean.Reservation;
import org.sid.springsecurity.bean.photo.ImageModule;

import javax.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
public class Voiture extends Modele{


    private String couleur;

    private int  nbrPlace;

    private String matricule;

    private int kiloMetrage;

    private String boitevitesse;

    private Date annee;

    private String ville;
    private Date dateMisecirculation;

    private Date dateAssurance;
    private Date sateVisitetechnique;
    @ManyToOne
    private CategorieVoiture categorieVoiture;

    @ManyToOne
    private AgenceLocation agenceLocation;

    @OneToMany
    private List<Reservation> reservation;

    @ElementCollection
    @CollectionTable(name = "voiture_images",
            joinColumns = @JoinColumn(name = "voiture_id"))
    @Column(name = "image_path")
    private Set<String> images;

    public Set<String> getImagePaths() {
        return images;
    }

    public void setImagePaths(Set<String> imagePaths) {
        this.images = imagePaths;
    }

    public String getCouleur() {
        return couleur;
    }

    public void setCouleur(String couleur) {
        this.couleur = couleur;
    }

    public int getNbrPlace() {
        return nbrPlace;
    }

    public void setNbrPlace(int nbrPlace) {
        this.nbrPlace = nbrPlace;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public int getKiloMetrage() {
        return kiloMetrage;
    }

    public void setKiloMetrage(int kiloMetrage) {
        this.kiloMetrage = kiloMetrage;
    }

    public String getBoitevitesse() {
        return boitevitesse;
    }

    public void setBoitevitesse(String boitevitesse) {
        this.boitevitesse = boitevitesse;
    }


    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }



    public CategorieVoiture getCategorieVoiture() {
        return categorieVoiture;
    }

    public void setCategorieVoiture(CategorieVoiture categorieVoiture) {
        this.categorieVoiture = categorieVoiture;
    }

    public AgenceLocation getAgenceLocation() {
        return agenceLocation;
    }

    public void setAgenceLocation(AgenceLocation agenceLocation) {
        this.agenceLocation = agenceLocation;
    }

    public List<Reservation> getReservation() {
        return reservation;
    }



    public void setAnnee(Date annee) {
        this.annee = annee;
    }


    public void setDateMisecirculation(Date dateMisecirculation) {
        this.dateMisecirculation = dateMisecirculation;
    }


    public void setDateAssurance(Date dateAssurance) {
        this.dateAssurance = dateAssurance;
    }


    public Date getAnnee() {
        return annee;
    }

    public Date getDateMisecirculation() {
        return dateMisecirculation;
    }

    public Date getDateAssurance() {
        return dateAssurance;
    }

    public Date getSateVisitetechnique() {
        return sateVisitetechnique;
    }

    public void setSateVisitetechnique(Date sateVisitetechnique) {
        this.sateVisitetechnique = sateVisitetechnique;
    }

    public void setReservation(List<Reservation> reservation) {
        this.reservation = reservation;
    }

//
//    public Voiture(Long id, String nom, String carburant, int puissance, Long id1, String couleur, String photo, int nbrPlace, String matricule, int kiloMetrage, String boitevitesse, LocalDate annee, String ville, LocalDate dateMisecirculation, LocalDateTime dateAssurance, LocalDateTime sateVisitetechnique, CategorieVoiture categorieVoiture, AgenceLocation agence_Location, Reservation reservation) {
//        super(id, nom, carburant, puissance);
//        this.id = id1;
//        this.couleur = couleur;
//        this.photo = photo;
//        this.nbrPlace = nbrPlace;
//        this.matricule = matricule;
//        this.kiloMetrage = kiloMetrage;
//        this.boitevitesse = boitevitesse;
//        this.annee = annee;
//        this.ville = ville;
//        this.dateMisecirculation = dateMisecirculation;
//        this.dateAssurance = dateAssurance;
//        this.sateVisitetechnique = sateVisitetechnique;
//        this.categorieVoiture = categorieVoiture;
//        this.agence_Location = agence_Location;
//        this.reservation = reservation;
//    }



}

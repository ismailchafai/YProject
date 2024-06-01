package org.sid.springsecurity.bean.appartementBean;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.sid.springsecurity.bean.communBean.Reservation;
import org.sid.springsecurity.bean.photo.ImageModule;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "appartement")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Appartement {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String code;

    private int superficie;

    private String adresse;
    private String ville;
    private String wifi;
    private int nmbrPersont ;
    private String climatiseur;

    private double loyerMensuel;

    @OneToMany
    private List<Reservation> reservation;

    @ManyToOne
    @JoinColumn(name = "categoriesAppartement_id")
    private CategoriesAppartement categoriesAppartement;

    @ManyToOne
    @JoinColumn(name = "agenceAppartement_id")
    private AgenceAppartement agenceAppartement;

    @ElementCollection
    @CollectionTable(name = "appartement_images",
            joinColumns = @JoinColumn(name = "appartement_id"))
    @Column(name = "image_path")
    private Set<String> images;

    public <E> Appartement(int i, String s, String marrakech, String oui, int i1, String oui1, double v, ArrayList<E> es, CategoriesAppartement categoriesAppartement, AgenceAppartement agenceAppartement1, HashSet<E> es1) {
    }


    public Set<String> getImagePaths() {
        return images;
    }

    public void setImagePaths(Set<String> imagePaths) {
        this.images = imagePaths;
    }
    public AgenceAppartement getAgenceAppartement() {
        return agenceAppartement;
    }

    public void setAgenceAppartement(AgenceAppartement agenceAppartement) {
        this.agenceAppartement = agenceAppartement;
    }



    public Appartement(int superficie, String adresse, String ville, String wifi, int nmbrPersont, String climatiseur, double loyerMensuel, List<Reservation> reservation, CategoriesAppartement categoriesAppartement, AgenceAppartement agenceAppartement) {
        this.superficie = superficie;
        this.adresse = adresse;
        this.ville = ville;
        this.wifi = wifi;
        this.nmbrPersont = nmbrPersont;
        this.climatiseur = climatiseur;
        this.loyerMensuel = loyerMensuel;
        this.reservation = reservation;
        this.categoriesAppartement = categoriesAppartement;
        this.agenceAppartement = agenceAppartement;
    }


    public Appartement() {
    }

    public Set<String> getImages() {
        return images;
    }

    public void setImages(Set<String> images) {
        this.images = images;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getSuperficie() {
        return superficie;
    }

    public void setSuperficie(int superficie) {
        this.superficie = superficie;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public double getLoyerMensuel() {
        return loyerMensuel;
    }

    public void setLoyerMensuel(double loyerMensuel) {
        this.loyerMensuel = loyerMensuel;
    }

    public List<Reservation> getReservation() {
        return reservation;
    }

    public void setReservation(List<Reservation> reservation) {
        this.reservation = reservation;
    }

    public CategoriesAppartement getCategoriesAppartement() {
        return categoriesAppartement;
    }

    public void setCategoriesAppartement(CategoriesAppartement categoriesAppartement) {
        this.categoriesAppartement = categoriesAppartement;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getWifi() {
        return wifi;
    }

    public void setWifi(String wifi) {
        this.wifi = wifi;
    }

    public int getNmbrPersont() {
        return nmbrPersont;
    }

    public void setNmbrPersont(int nmbrPersont) {
        this.nmbrPersont = nmbrPersont;
    }

    public String getClimatiseur() {
        return climatiseur;
    }

    public void setClimatiseur(String climatiseur) {
        this.climatiseur = climatiseur;
    }

}

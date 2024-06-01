package org.sid.springsecurity.bean.communBean;

import org.sid.springsecurity.bean.appartementBean.Appartement;
import org.sid.springsecurity.bean.voitureBean.Voiture;

import javax.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
public class Reservation {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String ref;
    private LocalDate Date_Debut;
    private LocalTime Heure_Debut;
    private LocalDate Date_Fin;
    private LocalTime Heure_Fin;
    private String Lieu_Prise;
    private String Lieu_Retour;

    private String Description;

    @ManyToOne
    private Voiture voiture;

    @ManyToOne
    private Client client;


    @OneToMany
    private List<Location> locations;

    @ManyToOne
    private Appartement appartement;


    public Reservation() {
    }

    public Reservation( String ref, LocalDate date_Debut, LocalTime heure_Debut, LocalDate date_Fin, LocalTime heure_Fin, String lieu_Prise, String lieu_Retour, String description, Voiture voiture, Client client, List<Location> locations, Appartement appartement) {
        this.ref = ref;
        Date_Debut = date_Debut;
        Heure_Debut = heure_Debut;
        Date_Fin = date_Fin;
        Heure_Fin = heure_Fin;
        Lieu_Prise = lieu_Prise;
        Lieu_Retour = lieu_Retour;
        Description = description;
        this.voiture = voiture;
        this.client = client;
        this.locations = locations;
        this.appartement = appartement;
    }


    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public LocalDate getDate_Debut() {
        return Date_Debut;
    }

    public void setDate_Debut(LocalDate date_Debut) {
        Date_Debut = date_Debut;
    }

    public LocalTime getHeure_Debut() {
        return Heure_Debut;
    }

    public void setHeure_Debut(LocalTime heure_Debut) {
        Heure_Debut = heure_Debut;
    }

    public LocalDate getDate_Fin() {
        return Date_Fin;
    }

    public void setDate_Fin(LocalDate date_Fin) {
        Date_Fin = date_Fin;
    }

    public LocalTime getHeure_Fin() {
        return Heure_Fin;
    }

    public void setHeure_Fin(LocalTime heure_Fin) {
        Heure_Fin = heure_Fin;
    }

    public String getLieu_Prise() {
        return Lieu_Prise;
    }

    public void setLieu_Prise(String lieu_Prise) {
        Lieu_Prise = lieu_Prise;
    }

    public String getLieu_Retour() {
        return Lieu_Retour;
    }

    public void setLieu_Retour(String lieu_Retour) {
        Lieu_Retour = lieu_Retour;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public Voiture getVoiture() {
        return voiture;
    }

    public void setVoiture(Voiture voiture) {
        this.voiture = voiture;
    }

    public Appartement getAppartement() {
        return appartement;
    }

    public void setAppartement(Appartement appartement) {
        this.appartement = appartement;
    }

    public void setId(Long id) {

        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }
}

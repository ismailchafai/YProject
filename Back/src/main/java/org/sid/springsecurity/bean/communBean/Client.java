package org.sid.springsecurity.bean.communBean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.sid.springsecurity.bean.appartementBean.AgenceAppartement;
import org.sid.springsecurity.bean.voitureBean.AgenceLocation;
import org.sid.springsecurity.security.bean.AppUser;

import javax.persistence.*;

import java.util.List;

@Entity
public class Client extends AppUser {
    private String cin ;
    private String prenom ;
    private String nom ;
    private String numTeleClient;
    private String emailClient;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "agenceLocation_id")
    private AgenceLocation agenceLocation ;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "agenceAppartement_id")
    private AgenceAppartement agenceAppartement ;

    @JsonIgnore
    @OneToMany(mappedBy = "client")
    private List<Reservation> reservation ;



    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getNumTeleClient() {
        return numTeleClient;
    }

    public void setNumTeleClient(String numTeleClient) {
        this.numTeleClient = numTeleClient;
    }



    public String getEmailClient() {
        return emailClient;
    }

    public void setEmailClient(String emailClient) {
        this.emailClient = emailClient;
    }

    public AgenceLocation getAgence_Location() {
        return agenceLocation;
    }

    public void setAgence_Location(AgenceLocation agence_Location) {
        this.agenceLocation = agence_Location;
    }

    public AgenceAppartement getProp_appartement() {
        return agenceAppartement;
    }

    public void setProp_appartement(AgenceAppartement prop_appartement) {
        this.agenceAppartement = prop_appartement;
    }

    public List<Reservation> getReservation() {
        return reservation;
    }

    public void setReservation(List<Reservation> reservation) {
        this.reservation = reservation;
    }

    public Client(String username,String password,String cin, String prenom, String nom, String numTeleClient , String emailClient) {
        this.setUsername(username);
        this.setPassword(password);
        this.cin = cin;
        this.prenom = prenom;
        this.nom = nom;
        this.numTeleClient = numTeleClient;
        this.emailClient = emailClient;
    }

    public Client() {

    }
}

package org.sid.springsecurity.bean.notification;

import javax.persistence.*;

import java.time.LocalDate;

@Entity
public class NotificationReservation {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String code;
    private String cinClient;
    private String nomClient;
    private String matriculeVoiture;
    private String codeAppartement;
    private Long iceAgence;
    private Long cinPropAppartement;
    private LocalDate dateDebutReservation;
    private LocalDate dateFinReservation;
    private boolean confermer;
    private boolean annuler;
    private boolean isVisible;
    private String refReservation;
    private boolean visibleClinet;


    public NotificationReservation() {

    }


    public String getRefReservation() {
        return refReservation;
    }

    public void setRefReservation(String refReservation) {
        this.refReservation = refReservation;
    }

    public boolean isVisibleClinet() {
        return visibleClinet;
    }

    public void setVisibleClinet(boolean visibleClinet) {
        this.visibleClinet = visibleClinet;
    }

    public LocalDate getDateDebutReservation() {
        return dateDebutReservation;
    }

    public boolean isConfermer() {
        return confermer;
    }

    public void setConfermer(boolean confermer) {
        this.confermer = confermer;
    }

    public boolean isAnnuler() {
        return annuler;
    }

    public void setAnnuler(boolean annuler) {
        this.annuler = annuler;
    }

    public void setDateDebutReservation(LocalDate dateDebutReservation) {
        this.dateDebutReservation = dateDebutReservation;
    }

    public LocalDate getDateFinReservation() {
        return dateFinReservation;
    }

    public void setDateFinReservation(LocalDate dateFinReservation) {
        this.dateFinReservation = dateFinReservation;
    }

    public boolean isVisible() {
        return isVisible;
    }

    public void setVisible(boolean visible) {
        isVisible = visible;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCinClient() {
        return cinClient;
    }

    public void setCinClient(String cinClient) {
        this.cinClient = cinClient;
    }

    public String getNomClient() {
        return nomClient;
    }

    public void setNomClient(String nomClient) {
        this.nomClient = nomClient;
    }

    public String getMatriculeVoiture() {
        return matriculeVoiture;
    }

    public void setMatriculeVoiture(String matriculeVoiture) {
        this.matriculeVoiture = matriculeVoiture;
    }

    public Long getIceAgence() {
        return iceAgence;
    }

    public void setIceAgence(Long iceAgence) {
        this.iceAgence = iceAgence;
    }

    public String getCodeAppartement() {
        return codeAppartement;
    }

    public void setCodeAppartement(String codeAppartement) {
        this.codeAppartement = codeAppartement;
    }

    public Long getCinPropAppartement() {
        return cinPropAppartement;
    }

    public void setCinPropAppartement(Long cinPropAppartement) {
        this.cinPropAppartement = cinPropAppartement;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }


    public NotificationReservation(Long id, String code, String cinClient, String nomClient, String matriculeVoiture, String codeAppartement, Long iceAgence, Long cinPropAppartement, LocalDate dateDebutReservation, LocalDate dateFinReservation, boolean confermer, boolean annuler, boolean isVisible, String refReservation, boolean visibleClinet) {
        this.id = id;
        this.code = code;
        this.cinClient = cinClient;
        this.nomClient = nomClient;
        this.matriculeVoiture = matriculeVoiture;
        this.codeAppartement = codeAppartement;
        this.iceAgence = iceAgence;
        this.cinPropAppartement = cinPropAppartement;
        this.dateDebutReservation = dateDebutReservation;
        this.dateFinReservation = dateFinReservation;
        this.confermer = confermer;
        this.annuler = annuler;
        this.isVisible = isVisible;
        this.refReservation = refReservation;
        this.visibleClinet = visibleClinet;
    }
}

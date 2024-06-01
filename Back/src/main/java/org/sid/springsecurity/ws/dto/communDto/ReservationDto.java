package org.sid.springsecurity.ws.dto.communDto;


import org.sid.springsecurity.ws.dto.appartementDto.AppartementDto;
import org.sid.springsecurity.ws.dto.voitureDto.VoitureDto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ReservationDto {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    private String ref;
    private LocalDate DateDebut;
    private LocalTime HeureDebut;

    private LocalDate DateFin;
    private LocalTime HeureFin;
    private String LieuPrise;
    private String LieuRetour;

    private String Description;
    private VoitureDto voiture;

    private ClientDto client;


    private AppartementDto appartement;

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public LocalDate getDateDebut() {
        return DateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        DateDebut = dateDebut;
    }

    public LocalTime getHeureDebut() {
        return HeureDebut;
    }

    public void setHeureDebut(LocalTime heureDebut) {
        HeureDebut = heureDebut;
    }

    public LocalDate getDateFin() {
        return DateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        DateFin = dateFin;
    }

    public LocalTime getHeureFin() {
        return HeureFin;
    }

    public void setHeureFin(LocalTime heureFin) {
        HeureFin = heureFin;
    }

    public String getLieuPrise() {
        return LieuPrise;
    }

    public void setLieuPrise(String lieuPrise) {
        LieuPrise = lieuPrise;
    }

    public String getLieuRetour() {
        return LieuRetour;
    }

    public void setLieuRetour(String lieuRetour) {
        LieuRetour = lieuRetour;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public VoitureDto getVoiture() {
        return voiture;
    }

    public void setVoiture(VoitureDto voiture) {
        this.voiture = voiture;
    }

    public ClientDto getClient() {
        return client;
    }

    public void setClient(ClientDto client) {
        this.client = client;
    }

    public AppartementDto getAppartement() {
        return appartement;
    }

    public void setAppartement(AppartementDto appartement) {
        this.appartement = appartement;
    }
}

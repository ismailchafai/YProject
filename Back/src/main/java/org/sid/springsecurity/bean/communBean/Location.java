package org.sid.springsecurity.bean.communBean;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Location {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLocation;
    private String ref;
    private LocalDate dateDebut;
    private LocalDate datefine;

    @OneToOne(mappedBy = "location")
    private Contrat contrat;

    @OneToOne(mappedBy = "location")
    private Facture facture;

    @ManyToOne
    private Reservation reservation;

    public Location() {
    }


    public Long getIdLocation() {
        return idLocation;
    }

    public void setIdLocation(Long idLocation) {
        this.idLocation = idLocation;
    }

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public Contrat getContrat() {
        return contrat;
    }

    public void setContrat(Contrat contrat) {
        this.contrat = contrat;
    }

    public Facture getFacture() {
        return facture;
    }

    public void setFacture(Facture facture) {
        this.facture = facture;
    }
    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDatefine() {
        return datefine;
    }

    public void setDatefine(LocalDate datefine) {
        this.datefine = datefine;
    }

    public Location( String ref, LocalDate dateDebut, LocalDate datefine, Contrat contrat, Facture facture, Reservation reservation) {
        this.ref = ref;
        this.dateDebut = dateDebut;
        this.datefine = datefine;
        this.contrat = contrat;
        this.facture = facture;
        this.reservation = reservation;
    }

    public Location(Long idLocation, String ref, Contrat contrat, Facture facture, Reservation reservation) {
        this.idLocation = idLocation;
        this.ref = ref;
        this.contrat = contrat;
        this.facture = facture;
        this.reservation = reservation;
    }
}

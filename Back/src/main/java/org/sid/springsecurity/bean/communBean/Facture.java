package org.sid.springsecurity.bean.communBean;

import javax.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Facture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFacture;

    private String ref;

    private LocalDateTime dateFacture;

    private double montantTotal;
    @OneToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @OneToOne
    @JoinColumn(name = "paiement_id")
    private Paiement paiement;



    public Facture() {
    }

    public Facture( String ref, LocalDateTime dateFacture, double montantTotal, Location location, Paiement paiement) {
        this.ref = ref;
        this.dateFacture = dateFacture;
        this.montantTotal = montantTotal;
        this.location = location;
        this.paiement = paiement;
    }


    public Long getIdFacture() {
        return idFacture;
    }

    public void setIdFacture(Long idFacture) {
        this.idFacture = idFacture;
    }

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public LocalDateTime getDateFacture() {
        return dateFacture;
    }

    public void setDateFacture(LocalDateTime dateFacture) {
        this.dateFacture = dateFacture;
    }

    public double getMontantTotal() {
        return montantTotal;
    }

    public void setMontantTotal(double montantTotal) {
        this.montantTotal = montantTotal;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Paiement getPaiement() {
        return paiement;
    }

    public void setPaiement(Paiement paiement) {
        this.paiement = paiement;
    }
}

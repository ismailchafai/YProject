package org.sid.springsecurity.bean.communBean;

import org.sid.springsecurity.bean.appartementBean.AgenceAppartement;
import org.sid.springsecurity.bean.voitureBean.AgenceLocation;

import javax.persistence.*;

import java.time.LocalDateTime;


@Entity
public class Paiement {
    @Id     @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String ref ;
    private LocalDateTime datePaiement;
    private Long ribClient;

    @ManyToOne
    @JoinColumn(name = "agenceLocation")
    private AgenceLocation agenceLocation ;

    @ManyToOne
    @JoinColumn(name = "agenceAppartement_id")
    private AgenceAppartement agenceAppartement ;

    @OneToOne(mappedBy = "paiement")
    private Facture facture ;


    public AgenceAppartement getProp_appartement() {
        return agenceAppartement;
    }

    public void setProp_appartement(AgenceAppartement prop_appartement) {
        this.agenceAppartement = prop_appartement;
    }

    public Facture getFacture() {
        return facture;
    }

    public void setFacture(Facture facture) {
        this.facture = facture;
    }

    public AgenceLocation getAgenceLocation() {
        return agenceLocation;
    }

    public void setAgenceLocation(AgenceLocation agence_Location) {
        this.agenceLocation = agence_Location;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public LocalDateTime getDatePaiement() {
        return datePaiement;
    }

    public void setDatePaiement(LocalDateTime datePaiement) {
        this.datePaiement = datePaiement;
    }

    public Long getRibClient() {
        return ribClient;
    }

    public void setRibClient(Long ribClient) {
        this.ribClient = ribClient;
    }

    public Paiement() {
    }

    public Paiement(String ref, LocalDateTime datePaiement, Long ribClient, AgenceLocation agence_Location, AgenceAppartement prop_appartement, Facture facture) {
        this.ref = ref;
        this.datePaiement = datePaiement;
        this.ribClient = ribClient;
        this.agenceLocation = agence_Location;
        this.agenceAppartement = prop_appartement;
        this.facture = facture;
    }
}


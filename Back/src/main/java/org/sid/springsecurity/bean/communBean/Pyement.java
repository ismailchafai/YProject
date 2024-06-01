package org.sid.springsecurity.bean.communBean;

import org.sid.springsecurity.bean.appartementBean.AgenceAppartement;
import org.sid.springsecurity.bean.voitureBean.AgenceLocation;

import javax.persistence.*;
import java.time.LocalDateTime;
@Entity
public class Pyement {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
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

    public AgenceLocation getAgenceLocation() {
        return agenceLocation;
    }

    public void setAgenceLocation(AgenceLocation agenceLocation) {
        this.agenceLocation = agenceLocation;
    }

    public AgenceAppartement getAgenceAppartement() {
        return agenceAppartement;
    }

    public void setAgenceAppartement(AgenceAppartement agenceAppartement) {
        this.agenceAppartement = agenceAppartement;
    }
}

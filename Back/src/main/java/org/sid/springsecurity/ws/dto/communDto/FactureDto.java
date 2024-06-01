package org.sid.springsecurity.ws.dto.communDto;


import java.time.LocalDateTime;

public class FactureDto {
    private String ref;
    private LocalDateTime dateFacture;
    private double montantTotal;
    private LocationDto location;
    private PaiementDto paiementDto;

    public PaiementDto getPaiementDto() {
        return paiementDto;
    }

    public void setPaiementDto(PaiementDto paiementDto) {
        this.paiementDto = paiementDto;
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

    public LocationDto getLocation() {
        return location;
    }

    public void setLocation(LocationDto location) {
        this.location = location;
    }
}

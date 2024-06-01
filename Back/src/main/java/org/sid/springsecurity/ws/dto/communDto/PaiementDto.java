package org.sid.springsecurity.ws.dto.communDto;



import org.sid.springsecurity.ws.dto.appartementDto.AgenceAppartementDto;
import org.sid.springsecurity.ws.dto.voitureDto.AgenceLocationDto;

import java.time.LocalDateTime;


public class PaiementDto {
    private Long idPaiement;
    private String ref;
    private LocalDateTime datePaiement;
    private Long ribClient;

    private AgenceLocationDto agenceLocationDto;

    private AgenceAppartementDto agenceAppartementDto;

    private FactureDto factureDto;

    public Long getIdPaiement() {
        return idPaiement;
    }

    public void setIdPaiement(Long idPaiement) {
        this.idPaiement = idPaiement;
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

    public AgenceLocationDto getAgenceLocationDto() {
        return agenceLocationDto;
    }

    public void setAgenceLocationDto(AgenceLocationDto agenceLocationDto) {
        this.agenceLocationDto = agenceLocationDto;
    }

    public AgenceAppartementDto getPropAppartemenetDto() {
        return agenceAppartementDto;
    }

    public void setPropAppartemenetDto(AgenceAppartementDto agenceAppartementDto) {
        this.agenceAppartementDto = agenceAppartementDto;
    }

    public FactureDto getFactureDto() {
        return factureDto;
    }

    public void setFactureDto(FactureDto factureDto) {
        this.factureDto = factureDto;
    }
}

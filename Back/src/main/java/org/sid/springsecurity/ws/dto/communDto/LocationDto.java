package org.sid.springsecurity.ws.dto.communDto;


import java.time.LocalDate;
import java.time.LocalDateTime;

public class LocationDto {

    private String ref;
    private LocalDate dateDebut;
    private LocalDate datefine;
//    private FactureDto facture;
//    private ContratDto contrat;


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

    public ReservationDto getReservationDto() {
        return reservationDto;
    }

    private ReservationDto reservationDto;
    public void setReservationDto(ReservationDto reservationDto) {
        this.reservationDto = reservationDto;
    }





    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

//    public FactureDto getFacture() {
//        return facture;
//    }
//
//    public void setFacture(FactureDto facture) {
//        this.facture = facture;
//    }

//    public ContratDto getContrat() {
//        return contrat;
//    }
//
//    public void setContrat(ContratDto contrat) {
//        this.contrat = contrat;
//    }
}

package org.sid.springsecurity.service.facade.communService;


import org.sid.springsecurity.bean.communBean.Reservation;

import java.util.List;

public interface ReservationService {
    Reservation findByRef(String ref);

    List<Reservation> findAll();

    int save(Reservation reservation);
    int deleteByRef(String ref);

    Reservation findByVoitureMatricule(String matricule);
    Reservation findByAppartementCode(String code);


    List<Reservation> findAllByClientCin(String cin);

    Reservation findByLocationsRef(String ref);

    List<Reservation> findReservationByVoitureMatricule(String matricule);

    List<Reservation> findReservationByAppartementCode(String code);
}

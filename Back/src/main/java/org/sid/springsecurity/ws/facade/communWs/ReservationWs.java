package org.sid.springsecurity.ws.facade.communWs;

import org.sid.springsecurity.bean.communBean.Reservation;
import org.sid.springsecurity.service.facade.communService.ReservationService;
import org.sid.springsecurity.ws.converter.communConverter.ReservationConverter;
import org.sid.springsecurity.ws.dto.communDto.ReservationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/safarent/manager/reservation/")

public class ReservationWs {
    @Autowired
    private ReservationService reservationService;
    @Autowired
    private ReservationConverter converter;

    @GetMapping("ref/{ref}")
    public ReservationDto findByRef(@PathVariable String ref) {
        return converter.toDto(reservationService.findByRef(ref));
    }
    @GetMapping
    public List<ReservationDto> findAll() {
        return converter.toDto(reservationService.findAll());
    }

    @DeleteMapping("ref/{ref}")
    @Transactional
    public int deleteByRef(@PathVariable String ref) {
        return reservationService.deleteByRef(ref);
    }

    @GetMapping("VoitureMatricule/{matricule}")
    public ReservationDto findByVoitureMatricule(@PathVariable String matricule) {
        return converter.toDto(reservationService.findByVoitureMatricule(matricule));
    }

    @GetMapping("AppartementCode/{code}")
    public ReservationDto findByAppartementCode(@PathVariable String code) {
        return converter.toDto(reservationService.findByAppartementCode(code));
    }

    @PostMapping
    public int save(@RequestBody ReservationDto reservationDto) {
        Reservation reservation =converter.toBean(reservationDto);
        return reservationService.save(reservation);
    }

    @GetMapping("clientCin/{cin}")
    public List<ReservationDto> findAllByClientCin(@PathVariable String cin) {
        return converter.toDto(reservationService.findAllByClientCin(cin));
    }

    @GetMapping("LocationsRef/{ref}")
    public ReservationDto findByLocationsRef(@PathVariable String ref) {
        return converter.toDto(reservationService.findByLocationsRef(ref));
    }
    @GetMapping("reservationByAppartement/public/code/{code}")
    public List<ReservationDto> findReservationByAppartementCode(@PathVariable String code) {
        return converter.toDto(reservationService.findReservationByAppartementCode(code));
    }
    @GetMapping("reservationByVoiture/public/matricule/{matricule}")
    public List<ReservationDto> findReservationByVoitureMatricule(@PathVariable String matricule) {
        return converter.toDto(reservationService.findReservationByVoitureMatricule(matricule));
    }
}


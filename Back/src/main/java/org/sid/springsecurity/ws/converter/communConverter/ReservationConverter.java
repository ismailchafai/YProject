package org.sid.springsecurity.ws.converter.communConverter;

import org.sid.springsecurity.bean.communBean.Reservation;
import org.sid.springsecurity.ws.converter.appartementConverter.AppartementConverter;
import org.sid.springsecurity.ws.converter.voitureConverter.VoitureConverter;
import org.sid.springsecurity.ws.dto.communDto.ReservationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReservationConverter {

    @Autowired
    private VoitureConverter voitureConverter;

    @Autowired
    private ClientConverter clientConverter;


    @Autowired
    private AppartementConverter appartementConverter;

    public ReservationDto toDto(Reservation bean) {
        if (bean == null) {
            return null;
        } else {
            ReservationDto dto = new ReservationDto();
            dto.setId(bean.getId());
            dto.setRef(bean.getRef());
            dto.setDateDebut(bean.getDate_Debut());
            dto.setHeureDebut(bean.getHeure_Debut());
            dto.setHeureFin(bean.getHeure_Fin());
            dto.setDateFin(bean.getDate_Fin());
            dto.setLieuPrise(bean.getLieu_Prise());
            dto.setLieuRetour(bean.getLieu_Retour());
            dto.setDescription(bean.getDescription());
            dto.setClient(clientConverter.toDto(bean.getClient()));
            dto.setVoiture(voitureConverter.toDto(bean.getVoiture()));
            dto.setAppartement(appartementConverter.toDto(bean.getAppartement()));
            return dto;
        }
    }

    public Reservation toBean(ReservationDto dto) {
        if (dto == null) {
            return null;
        } else {
            Reservation bean = new Reservation();
            bean.setId(dto.getId());
            bean.setRef(dto.getRef());
            bean.setDate_Debut(dto.getDateDebut());
            bean.setHeure_Debut(dto.getHeureDebut());
            bean.setHeure_Fin(dto.getHeureFin());
            bean.setDate_Fin(dto.getDateFin());
            bean.setLieu_Prise(dto.getLieuPrise());
            bean.setLieu_Retour(dto.getLieuRetour());
            bean.setDescription(dto.getDescription());
            bean.setClient(clientConverter.toBean(dto.getClient()));
            bean.setVoiture(voitureConverter.toBean(dto.getVoiture()));
            bean.setAppartement(appartementConverter.toBean(dto.getAppartement()));
            return bean;
        }
    }

    public List<ReservationDto> toDto(List<Reservation> beans) {
        return beans.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<Reservation> toBean(List<ReservationDto> dtos) {
        return dtos.stream().map(this::toBean).collect(Collectors.toList());
    }
}

package org.sid.springsecurity.ws.converter.communConverter;

import org.sid.springsecurity.bean.communBean.Location;
import org.sid.springsecurity.ws.dto.communDto.LocationDto;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LocationConverter {
    private ContratConverter contratConverter ;
    private FactureConverter factureConverter ;
    private ReservationConverter  reservationConverter ;

    public LocationConverter(@Lazy ContratConverter contratConverter,@Lazy FactureConverter factureConverter,@Lazy ReservationConverter reservationConverter) {
        this.contratConverter = contratConverter;
        this.factureConverter = factureConverter;
        this.reservationConverter = reservationConverter;
    }

    public LocationDto toDto(Location bean) {
        if(bean == null){return null ;}
        else {
            LocationDto dto = new LocationDto();
            dto.setRef(bean.getRef());
            dto.setDateDebut(bean.getDateDebut());
            dto.setDatefine(bean.getDatefine());
//            if (bean.getFacture() != null) {
//                dto.setFacture(factureConverter.toDto(bean.getFacture()));
//            }
//            if (bean.getContrat() != null) {
//                dto.setContrat(contratConverter.toDto(bean.getContrat()));
//            }
//

        if (bean.getReservation() != null) {
            dto.setReservationDto(reservationConverter.toDto(bean.getReservation()));
        }
            return dto;
        }
    }

    public Location toBean(LocationDto dto) {
        if (dto == null){return  null ;}
        else {
            Location bean = new Location();
            bean.setRef(dto.getRef());
            bean.setDateDebut(dto.getDateDebut());
            bean.setDatefine(dto.getDatefine());
//            if (dto.getFacture() != null) {
//                bean.setFacture(factureConverter.toBean(dto.getFacture()));
//            }
//            if (dto.getContrat() != null) {
//                bean.setContrat(contratConverter.toBean(dto.getContrat()));
//            }

        if (dto.getReservationDto() != null) {
            bean.setReservation(reservationConverter.toBean(dto.getReservationDto()));
        }
            return bean;
        }
    }

    public List<LocationDto> toDto (List<Location> beans){
        return beans.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<Location> toBean(List<LocationDto> dtos){
        return dtos.stream().map(this::toBean).collect(Collectors.toList());
    }
}

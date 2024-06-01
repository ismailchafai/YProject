package org.sid.springsecurity.ws.converter.communConverter;

import org.sid.springsecurity.bean.communBean.Client;
import org.sid.springsecurity.ws.converter.appartementConverter.AgenceAppartementConverter;
import org.sid.springsecurity.ws.converter.voitureConverter.AgenceLocationConverter;
import org.sid.springsecurity.ws.dto.communDto.ClientDto;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ClientConverter {
    private AgenceLocationConverter agenceLocationConverter ;
    private AgenceAppartementConverter propAppartementConverter ;
    private ReservationConverter reservationConverter ;

    public ClientConverter(@Lazy AgenceLocationConverter agenceLocationConverter, @Lazy AgenceAppartementConverter propAppartementConverter, @Lazy ReservationConverter reservationConverter) {
        this.agenceLocationConverter = agenceLocationConverter;
        this.propAppartementConverter = propAppartementConverter;
        this.reservationConverter = reservationConverter;
    }

    public ClientDto toDto(Client bean) {
        if(bean == null){return  null ;}
        else {
            ClientDto dto = new ClientDto();
            dto.setCin(bean.getCin());
            dto.setNom(bean.getNom());
            dto.setPrenom(bean.getPrenom());
            dto.setNumTeleClient(bean.getNumTeleClient());
            dto.setUsername_Client(bean.getUsername());
            dto.setPassword_Client(bean.getPassword());
            dto.setEmail_Client(bean.getEmailClient());
            if (bean.getAgence_Location() != null) {
                dto.setAgenceLocation(agenceLocationConverter.toDto(bean.getAgence_Location()));
            }
            if (bean.getProp_appartement() != null) {
                dto.setPropAppartemenetDto(propAppartementConverter.toDto(bean.getProp_appartement()));
            }
//            if (bean.getReservation() != null) {
//                dto.setReservationDto(reservationConverter.toDto(bean.getReservation()));
//            }
            return dto;
        }
    }
    public Client toBean(ClientDto dto) {
        if(dto == null){return  null ;}
        else {
            Client bean = new Client();
            bean.setCin(dto.getCin());
            bean.setNom(dto.getNom());
            bean.setPrenom(dto.getPrenom());
            bean.setNumTeleClient(dto.getNumTeleClient());
            bean.setUsername(dto.getUsername_Client());
            bean.setPassword(dto.getPassword_Client());
            bean.setEmailClient(dto.getEmail_Client());
            if (dto.getAgenceLocation() != null) {
                bean.setAgence_Location(agenceLocationConverter.toBean(dto.getAgenceLocation()));
            }
            if (dto.getPropAppartemenetDto() != null) {
                bean.setProp_appartement(propAppartementConverter.toBean(dto.getPropAppartemenetDto()));
            }
//            if (dto.getReservationDto() != null) {
//                bean.setReservation(reservationConverter.toBean(dto.getReservationDto()));
//            }
            return bean;
        }
    }
    public List<ClientDto> toDto(List<Client> beans){
        return beans.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<Client> toBean(List<ClientDto> dtos){
        return dtos.stream().map(this::toBean).collect(Collectors.toList());
    }
}

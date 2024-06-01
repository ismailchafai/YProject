package org.sid.springsecurity.ws.converter;


import org.sid.springsecurity.bean.notification.NotificationReservation;
import org.sid.springsecurity.ws.dto.NotificationReservationDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class NotificationReservationConverter {
    public NotificationReservation toBean(NotificationReservationDto dto) {
        if(dto==null){
            return  null;
        }
        else {
            NotificationReservation bean = new NotificationReservation();
            bean.setId(dto.getId());
            bean.setCode(dto.getCode());
            bean.setCinClient(dto.getCinClient());
            bean.setNomClient(dto.getNomClient());
            bean.setIceAgence(dto.getIceAgence());
            bean.setDateDebutReservation(dto.getDateDebutReservation());
            bean.setDateFinReservation(dto.getDateFinReservation());
            bean.setCodeAppartement(dto.getCodeAppartement());
            bean.setMatriculeVoiture(dto.getMatriculeVoiture());
            bean.setCinPropAppartement(dto.getCinPropAppartement());
            bean.setConfermer(dto.isConfermer());
            bean.setAnnuler(dto.isAnnuler());
            bean.setVisible(dto.isIsvisible());
            bean.setVisibleClinet(dto.isVisibleClinet());
            bean.setRefReservation(dto.getRefReservation());
            return bean;
        }
    }
    public NotificationReservationDto toDto(NotificationReservation bean) {
        if(bean==null){
            return  null;
        }
        else {
            NotificationReservationDto dto = new NotificationReservationDto();
            dto.setId(bean.getId());
            dto.setCode(bean.getCode());
            dto.setCinClient(bean.getCinClient());
            dto.setNomClient(bean.getNomClient());
            dto.setIceAgence(bean.getIceAgence());
            dto.setDateDebutReservation(bean.getDateDebutReservation());
            dto.setDateFinReservation(bean.getDateFinReservation());
            dto.setCodeAppartement(bean.getCodeAppartement());
            dto.setMatriculeVoiture(bean.getMatriculeVoiture());
            dto.setCinPropAppartement(bean.getCinPropAppartement());
            dto.setConfermer(bean.isConfermer());
            dto.setAnnuler(bean.isAnnuler());
            dto.setIsvisible(bean.isVisible());
            dto.setVisibleClinet(bean.isVisibleClinet());
            dto.setRefReservation(bean.getRefReservation());
            return dto;
        }
    }
    public List<NotificationReservation> toBean(List<NotificationReservationDto> dtos) {
        List<NotificationReservation> beans = new ArrayList<>();
        for (NotificationReservationDto dto : dtos) {
            beans.add(toBean(dto));
        }
        return beans;
    }
    public List<NotificationReservationDto> toDto(List<NotificationReservation> beans) {
        List<NotificationReservationDto> dtos = new ArrayList<>();
        for (NotificationReservation dto : beans) {
            dtos.add(toDto(dto));
        }
        return dtos;
    }
}

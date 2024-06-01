package org.sid.springsecurity.ws.converter.voitureConverter;

import org.sid.springsecurity.bean.voitureBean.AgenceLocation;
import org.sid.springsecurity.ws.converter.communConverter.ClientConverter;
import org.sid.springsecurity.ws.converter.communConverter.PaiementConverter;
import org.sid.springsecurity.ws.dto.voitureDto.AgenceLocationDto;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AgenceLocationConverter {
    public AgenceLocation toBean(AgenceLocationDto dto) {
        if(dto==null){
            return  null;
        }
        else {

            AgenceLocation bean = new AgenceLocation();
           bean.setIceAgLoc(dto.getIceAgLoc());
           bean.setRaisonSocialAg(dto.getRaisonSocialAg());
           bean.setAdresse(dto.getAdresse());
           bean.setNumTelephone(dto.getNumTelephone());
           bean.setNumCompteBkAgLoc(dto.getNumCompteBkAgLoc());
           bean.setRibAgenceLoc(dto.getRibAgenceLoc());
           bean.setUsername(dto.getUsernameAgenceLoc());
           bean.setPassword(dto.getPassword());
           bean.setRCAgLoc(dto.getRCAgLoc());
            bean.setImagePaths(dto.getImagePaths());
//            if(dto.getVoitureDtos()!=null){
//                bean.setVoitures(voitureConverter.toBean(dto.getVoitureDtos()));
//
//            }
//            if(dto.getClientDtos()!=null){
//                bean.setClients(clientConverter.toBean(dto.getClientDtos()));
//
//            }
//            if(dto.getPaiementDtos()!=null){
//                bean.setPaiements(paiementConverter.toBean(dto.getPaiementDtos()));
//
//            }
            return bean;
        }
    }
    public AgenceLocationDto toDto(AgenceLocation bean) {
        if(bean==null){
            return  null;
        }
        else {
            AgenceLocationDto dto = new AgenceLocationDto();
            dto.setIceAgLoc(bean.getIceAgLoc());
            dto.setRaisonSocialAg(bean.getRaisonSocialAg());
            dto.setAdresse(bean.getAdresse());
            dto.setNumTelephone(bean.getNumTelephone());
            dto.setNumCompteBkAgLoc(bean.getNumCompteBkAgLoc());
            dto.setRibAgenceLoc(bean.getRibAgenceLoc());
            dto.setUsernameAgenceLoc(bean.getUsername());
            dto.setPassword(bean.getPassword());
            dto.setRCAgLoc(bean.getRCAgLoc());
            dto.setImagePaths(bean.getImagePaths());

//            if(bean.getVoitures()!=null){
//                dto.setVoitureDtos(voitureConverter.toDto(bean.getVoitures()));
//
//            }
//            if(bean.getClients()!=null){
//                dto.setClientDtos(clientConverter.toDto(bean.getClients()));
//
//            }
//            if(bean.getPaiements()!=null){
//                dto.setPaiementDtos(paiementConverter.toDto(bean.getPaiements()));
//
//            }
            return dto;
        }

    }
    public List<AgenceLocation> toBean(List<AgenceLocationDto> dtos) {
        List<AgenceLocation> beans = new ArrayList<>();
        for (AgenceLocationDto dto : dtos) {
            beans.add(toBean(dto));
        }
        return beans;
    }

    public List<AgenceLocationDto> toDto(List<AgenceLocation> beans) {
        List<AgenceLocationDto> dtos = new ArrayList<>();
        for (AgenceLocation dto : beans) {
            dtos.add(toDto(dto));
        }
        return dtos;
    }
    private VoitureConverter voitureConverter;
    private ClientConverter clientConverter;
    private PaiementConverter paiementConverter;

    public AgenceLocationConverter(@Lazy VoitureConverter voitureConverter,@Lazy ClientConverter clientConverter,@Lazy PaiementConverter paiementConverter) {
        this.voitureConverter = voitureConverter;
        this.clientConverter = clientConverter;
        this.paiementConverter = paiementConverter;
    }
}

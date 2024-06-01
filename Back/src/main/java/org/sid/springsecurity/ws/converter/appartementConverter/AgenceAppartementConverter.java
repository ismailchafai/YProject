package org.sid.springsecurity.ws.converter.appartementConverter;
import org.sid.springsecurity.bean.appartementBean.AgenceAppartement;
import org.sid.springsecurity.ws.converter.communConverter.ClientConverter;
import org.sid.springsecurity.ws.converter.communConverter.PaiementConverter;
import org.sid.springsecurity.ws.dto.appartementDto.AgenceAppartementDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AgenceAppartementConverter {

    public AgenceAppartement toBean(AgenceAppartementDto dto) {
        if(dto==null){
            return  null;
        }
        else {
            AgenceAppartement bean = new AgenceAppartement();
            bean.setId(dto.getId());
            bean.setIceAgApp(dto.getIceAgApp());
            bean.setRaisonSocialAg(dto.getRaisonSocialAg());
            bean.setNumTele(dto.getNumTele());
            bean.setEmail(dto.getEmail());
            bean.setAdresse(dto.getAdresse());
            bean.setNumCompteBkAgApp(dto.getNumCompteBkAgApp());
            bean.setRibAgenceApp(dto.getRibAgenceApp());
            bean.setRCAgApp(dto.getRCAgApp());
            bean.setUsername(dto.getUsername());
            bean.setPassword(dto.getPassword());
            bean.setImagePaths(dto.getImagePaths());
            return bean;
        }
    }
    public AgenceAppartementDto toDto(AgenceAppartement bean) {
        if(bean==null){
            return null;
        }
        else {
            AgenceAppartementDto dto = new AgenceAppartementDto();
            dto.setId(bean.getId());
            dto.setIceAgApp(bean.getIceAgApp());
            dto.setRaisonSocialAg(bean.getRaisonSocialAg());
            dto.setNumTele(bean.getNumTele());
            dto.setEmail(bean.getEmail());
            dto.setAdresse(bean.getAdresse());
            dto.setNumCompteBkAgApp(bean.getNumCompteBkAgApp());
            dto.setRibAgenceApp(bean.getRibAgenceApp());
            dto.setRCAgApp(bean.getRCAgApp());
            dto.setUsername(bean.getUsername());
            dto.setPassword(bean.getPassword());
            dto.setImagePaths(bean.getImagePaths());
            return dto;
        }

    }

    public List<AgenceAppartement> toBean(List<AgenceAppartementDto> dtos) {
        List<AgenceAppartement> beans = new ArrayList<>();
        for (AgenceAppartementDto dto : dtos) {
            beans.add(toBean(dto));
        }
        return beans;
    }
    public List<AgenceAppartementDto> toDto(List<AgenceAppartement> beans) {
        List<AgenceAppartementDto> dtos = new ArrayList<>();
        for (AgenceAppartement dto : beans) {
            dtos.add(toDto(dto));
        }
        return dtos;
    }

    private boolean client;
    private boolean paiement;
    private boolean appartement;

    AgenceAppartementConverter(){
        initObject(true);
    }
    public void initObject(boolean value) {
        this.client = value;
        this.paiement = value;
        this.appartement = value;
    }


}

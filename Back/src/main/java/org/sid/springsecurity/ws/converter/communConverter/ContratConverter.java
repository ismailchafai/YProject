package org.sid.springsecurity.ws.converter.communConverter;

import org.sid.springsecurity.bean.communBean.Contrat;
import org.sid.springsecurity.ws.dto.communDto.ContratDto;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ContratConverter {

    private LocationConverter locationConverter;

    public ContratConverter(@Lazy LocationConverter locationConverter) {
        this.locationConverter = locationConverter;
    }

    public ContratDto toDto(Contrat bean) {
            if(bean == null){return  null ;}
            else {
                ContratDto dto = new ContratDto();
                dto.setNumContrat(bean.getNumContrat());
                dto.setPrixHT(bean.getPrixHT());
                dto.setTva(bean.getTva());
                dto.setModelePaiement(bean.getModelePaiement());
                dto.setDureeRetard(bean.getDureeRetard());
                dto.setDateSignature(bean.getDateSignature());
                dto.setRest(bean.getRest());
                if (bean.getLocation() != null) {
                    dto.setLocation(locationConverter.toDto(bean.getLocation()));
                }
                return dto;
            }
        }

        public Contrat toBean(ContratDto dto) {
            if (dto == null){return null ;}
            else {
                Contrat bean = new Contrat();
                bean.setNumContrat(dto.getNumContrat());
                bean.setPrixHT(dto.getPrixHT());
                bean.setTva(dto.getTva());
                bean.setModelePaiement(dto.getModelePaiement());
                bean.setDureeRetard(dto.getDureeRetard());
                bean.setDateSignature(dto.getDateSignature());
                bean.setRest(dto.getRest());
                if (dto.getLocation() != null) {
                    bean.setLocation(locationConverter.toBean(dto.getLocation()));
                }
                return bean;
            }
        }
    public List<ContratDto> toDto(List<Contrat> beans){
        return beans.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<Contrat> toBean(List<ContratDto> dtos){
        return dtos.stream().map(this::toBean).collect(Collectors.toList());
    }

    }



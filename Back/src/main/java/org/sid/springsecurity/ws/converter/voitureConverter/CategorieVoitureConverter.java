package org.sid.springsecurity.ws.converter.voitureConverter;

import org.sid.springsecurity.bean.voitureBean.CategorieVoiture;
import org.sid.springsecurity.ws.dto.voitureDto.CategorieVoitureDto;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class CategorieVoitureConverter {
    public CategorieVoiture toBean(CategorieVoitureDto dto) {
        if(dto==null){
            return  null;
        }
        else {
            CategorieVoiture bean = new CategorieVoiture();
            bean.setId(dto.getId());
            bean.setLibelle(dto.getLibelle());
            bean.setImagePaths(dto.getImagePaths());

            return bean;
        }
    }
    public CategorieVoitureDto toDto(CategorieVoiture bean) {
        if(bean==null){
            return  null;
        }
        else {
            CategorieVoitureDto dto = new CategorieVoitureDto();
            dto.setId(bean.getId());
            dto.setLibelle(bean.getLibelle());
            dto.setImagePaths(bean.getImagePaths());
            return dto;
        }

    }
    public List<CategorieVoiture> toBean(List<CategorieVoitureDto> dtos) {
        List<CategorieVoiture> beans = new ArrayList<>();
        for (CategorieVoitureDto dto : dtos) {
            beans.add(toBean(dto));
        }
        return beans;
    }

    public List<CategorieVoitureDto> toDto(List<CategorieVoiture> beans) {
        List<CategorieVoitureDto> dtos = new ArrayList<>();
        for (CategorieVoiture dto : beans) {
            dtos.add(toDto(dto));
        }
        return dtos;
    }
    private VoitureConverter voitureConverter;

    public CategorieVoitureConverter(@Lazy VoitureConverter voitureConverter) {
        this.voitureConverter = voitureConverter;
    }
}

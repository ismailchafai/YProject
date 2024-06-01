package org.sid.springsecurity.ws.converter.appartementConverter;


import org.sid.springsecurity.bean.appartementBean.CategoriesAppartement;
import org.sid.springsecurity.ws.dto.appartementDto.CategoriesAppartementDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class CategoriesAppartementConverter {

    private AppartementConverter appartementConverter;




    public CategoriesAppartementConverter(AppartementConverter appartementConverter) {
        this.appartementConverter = appartementConverter;
    }

    public CategoriesAppartement toBean(CategoriesAppartementDto dto) {
        if(dto==null){
            return  null;
        }
        else{
            CategoriesAppartement bean = new CategoriesAppartement();
            bean.setId(dto.getId());
            bean.setLibelle(dto.getLibelle());
            bean.setImagePaths(dto.getImagePaths());
            return bean;
        }
    }

    public CategoriesAppartementDto toDto(CategoriesAppartement bean) {
        if(bean==null){
            return  null;
        }
        else {
            CategoriesAppartementDto dto = new CategoriesAppartementDto();
            dto.setId(bean.getId());
            dto.setLibelle(bean.getLibelle());
            dto.setImagePaths(bean.getImagePaths());
            return dto;
        }

    }

    public List<CategoriesAppartement> toBean(List<CategoriesAppartementDto> dtos) {
        List<CategoriesAppartement> beans = new ArrayList<>();
        for (CategoriesAppartementDto dto : dtos) {
            beans.add(toBean(dto));
        }
        return beans;
    }

    public List<CategoriesAppartementDto> toDto(List<CategoriesAppartement> beans) {
        List<CategoriesAppartementDto> dtos = new ArrayList<>();
        for (CategoriesAppartement dto : beans) {
            dtos.add(toDto(dto));
        }
        return dtos;
    }


    public boolean isAppartement() {
        return appartement;
    }

    public void setAppartement(boolean appartement) {
        this.appartement = appartement;
    }

    private boolean appartement;
    CategoriesAppartementConverter(){
        initObject(true);
    }
    public void initObject(boolean value) {
        this.appartement = value;
    }

}

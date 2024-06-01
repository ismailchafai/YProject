package org.sid.springsecurity.ws.converter.voitureConverter;

import org.sid.springsecurity.bean.voitureBean.Voiture;
import org.sid.springsecurity.ws.converter.communConverter.ReservationConverter;
import org.sid.springsecurity.ws.dto.voitureDto.VoitureDto;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class VoitureConverter {
    public Voiture toBean(VoitureDto dto) {
        if(dto==null){
            return  null;
        }
        else {
            Voiture bean = new Voiture();
            bean.setId(dto.getId());
            bean.setCouleur(dto.getCouleur());
            bean.setNbrPlace(dto.getNbrPlace());
            bean.setMatricule(dto.getMatricule());
            bean.setKiloMetrage(dto.getKiloMetrage());
            bean.setBoitevitesse(dto.getBoitevitesse());
            bean.setAnnee(dto.getAnnee());
            bean.setVille(dto.getVille());
            bean.setDateMisecirculation(dto.getDateMisecirculation());
            bean.setDateAssurance(dto.getDateAssurance());
            bean.setSateVisitetechnique(dto.getSateVisitetechnique());
            bean.setCarburant(dto.getCarburant());
            bean.setPuissance(dto.getPuissance());
            bean.setPrix(dto.getPrix());
            bean.setNomModele(dto.getNomModele());
            if(dto.getCategorie()!=null){
                bean.setCategorieVoiture(categorieVoitureConverter.toBean(dto.getCategorie()));
            }
            if (dto.getAgenceLocation()!=null){
                bean.setAgenceLocation(agenceLocationConverter.toBean(dto.getAgenceLocation()));
            }
            if(dto.getReservation()!=null){
                bean.setReservation(reservationConverter.toBean(dto.getReservation()));
            }
                bean.setImagePaths(dto.getImagePaths());
            return bean;
        }
    }
    public VoitureDto toDto(Voiture bean) {
        if(bean==null){
            return  null;
        }
        else {
            VoitureDto dto = new VoitureDto();
            dto.setId(bean.getId());
            dto.setCouleur(bean.getCouleur());
            dto.setNbrPlace(bean.getNbrPlace());
            dto.setMatricule(bean.getMatricule());
            dto.setKiloMetrage(bean.getKiloMetrage());
            dto.setBoitevitesse(bean.getBoitevitesse());
            dto.setAnnee(bean.getAnnee());
            dto.setVille(bean.getVille());
            dto.setDateMisecirculation(bean.getDateMisecirculation());
            dto.setDateAssurance(bean.getDateAssurance());
            dto.setSateVisitetechnique(bean.getSateVisitetechnique());
            dto.setCarburant(bean.getCarburant());
            dto.setPuissance(bean.getPuissance());
            dto.setPrix(bean.getPrix());
            dto.setNomModele(bean.getNomModele());
            if(bean.getCategorieVoiture()!=null){
                dto.setCategorie(categorieVoitureConverter.toDto(bean.getCategorieVoiture()));
            }
            if(bean.getAgenceLocation()!=null){
                dto.setAgenceLocation(agenceLocationConverter.toDto(bean.getAgenceLocation()));
            }
            if(bean.getReservation()!=null){
                dto.setReservation(reservationConverter.toDto(bean.getReservation()));
            }
                dto.setImagePaths(bean.getImagePaths());
            return dto;
        }

    }

    public List<Voiture> toBean(List<VoitureDto> dtos) {
        List<Voiture> beans = new ArrayList<>();
        for (VoitureDto dto : dtos) {
            beans.add(toBean(dto));
        }
        return beans;
    }

    public List<VoitureDto> toDto(List<Voiture> beans) {
        List<VoitureDto> dtos = new ArrayList<>();
        for (Voiture dto : beans) {
            dtos.add(toDto(dto));
        }
        return dtos;
    }


    private CategorieVoitureConverter categorieVoitureConverter;
    private AgenceLocationConverter agenceLocationConverter;
    private ReservationConverter reservationConverter;

    public VoitureConverter(@Lazy CategorieVoitureConverter categorieVoitureConverter,@Lazy AgenceLocationConverter agenceLocationConverter,@Lazy ReservationConverter reservationConverter) {
        this.categorieVoitureConverter = categorieVoitureConverter;
        this.agenceLocationConverter = agenceLocationConverter;
        this.reservationConverter = reservationConverter;
    }
}

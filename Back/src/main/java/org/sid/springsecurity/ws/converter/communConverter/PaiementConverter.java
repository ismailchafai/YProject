package org.sid.springsecurity.ws.converter.communConverter;

import org.sid.springsecurity.bean.communBean.Paiement;
import org.sid.springsecurity.ws.converter.appartementConverter.AgenceAppartementConverter;
import org.sid.springsecurity.ws.converter.voitureConverter.AgenceLocationConverter;
import org.sid.springsecurity.ws.dto.communDto.PaiementDto;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PaiementConverter {
   public PaiementConverter(@Lazy AgenceLocationConverter agenceLocationConverter, @Lazy AgenceAppartementConverter agenceAppartementConverter, @Lazy FactureConverter factureConverter) {
      this.agenceLocationConverter = agenceLocationConverter;
      this.agenceAppartementConverter = agenceAppartementConverter;
      this.factureConverter = factureConverter;
   }

   private AgenceLocationConverter agenceLocationConverter;
    private AgenceAppartementConverter agenceAppartementConverter;
    private FactureConverter factureConverter ;
   public Paiement toBean(PaiementDto dto){
      if(dto == null){return null ;}
      else {
         Paiement bean = new Paiement();
         bean.setRef(dto.getRef());
         bean.setDatePaiement(dto.getDatePaiement());
         bean.setRibClient(dto.getRibClient());


         if (dto.getPropAppartemenetDto() != null) {
            bean.setProp_appartement(agenceAppartementConverter.toBean(dto.getPropAppartemenetDto()));
         }

         if (dto.getAgenceLocationDto() != null) {
            bean.setAgenceLocation(agenceLocationConverter.toBean(dto.getAgenceLocationDto()));
         }

         if (dto.getFactureDto() != null) {
            bean.setFacture(factureConverter.toBean(dto.getFactureDto()));
         }
         return bean;
      }
   }

   public PaiementDto toDto(Paiement bean) {
      if (bean == null) {
         return null;
      } else {
         PaiementDto dto = new PaiementDto();
         dto.setRef(bean.getRef());
         dto.setDatePaiement(bean.getDatePaiement());
         dto.setRibClient(bean.getRibClient());

         if (bean.getAgenceLocation() != null) {
            dto.setAgenceLocationDto(agenceLocationConverter.toDto(bean.getAgenceLocation()));
         }
         if (bean.getFacture() != null) {
            dto.setFactureDto(factureConverter.toDto(bean.getFacture()));
         }
         if (bean.getProp_appartement() != null) {
            dto.setPropAppartemenetDto(agenceAppartementConverter.toDto(bean.getProp_appartement()));
         }
         return dto;
      }
   }
   public List<PaiementDto> toDto(List<Paiement> beans){
      return beans.stream().map(this::toDto).collect(Collectors.toList());
   }

   public List<Paiement> toBean(List<PaiementDto> dtos){
      return dtos.stream().map(this::toBean).collect(Collectors.toList());
   }
}


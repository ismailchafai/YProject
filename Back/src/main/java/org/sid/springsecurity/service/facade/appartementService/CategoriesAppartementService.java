package org.sid.springsecurity.service.facade.appartementService;


import org.sid.springsecurity.bean.appartementBean.CategoriesAppartement;
import org.sid.springsecurity.ws.dto.appartementDto.CategoriesAppartementDto;

import java.util.List;
public interface CategoriesAppartementService {
    int save(CategoriesAppartement categoriesAppartement);
    List<CategoriesAppartement> findAll();

    int update(String libelle, String libelleNew);

    CategoriesAppartement findByLibelle(String libelle);
    int deleteByLibelle(String libelle);
}

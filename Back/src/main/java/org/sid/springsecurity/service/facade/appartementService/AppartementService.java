package org.sid.springsecurity.service.facade.appartementService;


import org.sid.springsecurity.bean.appartementBean.Appartement;
import org.sid.springsecurity.bean.photo.ImageModule;

import java.util.List;

public interface AppartementService {
    int save(Appartement appartement);

    List<Appartement> findAll();

    Appartement findByCode(String code);

    int deleteByCode(String code);

    List<Appartement> findByCategoriesAppartementLibelleAndAgenceAppartementUsername(String libelle, String username);

    int update(Appartement appartementNv);

    List<Appartement> findByCategoriesAppartementLibelle(String libelle);

    List<Appartement> findByAgenceAppartementIceAgApp(Long iceAgApp);

    List<Appartement> findByAdresse(String adresse);

    List<Appartement> findByLoyerMensuelLessThanEqual(double mont);
}

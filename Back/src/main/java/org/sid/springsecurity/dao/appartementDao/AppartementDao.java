package org.sid.springsecurity.dao.appartementDao;


import org.sid.springsecurity.bean.appartementBean.Appartement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppartementDao extends JpaRepository<Appartement,Long> {
   Appartement findByCode(String code);
   int deleteByCode(String code);

   List<Appartement> findByCategoriesAppartementLibelle(String libelle);
   List<Appartement> findByCategoriesAppartementLibelleAndAgenceAppartementUsername(String libelle ,String username);


   List<Appartement> findByAgenceAppartementIceAgApp(Long iceAgApp);
   List<Appartement> findByAdresse(String adresse);
   List<Appartement> findByLoyerMensuelLessThanEqual(double mont);
}



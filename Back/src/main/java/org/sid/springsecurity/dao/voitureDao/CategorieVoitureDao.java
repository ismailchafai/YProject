package org.sid.springsecurity.dao.voitureDao;

import org.sid.springsecurity.bean.voitureBean.CategorieVoiture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorieVoitureDao extends JpaRepository<CategorieVoiture, Long> {
    CategorieVoiture findByLibelle(String libelle);
    int deleteByLibelle(String libelle);

}

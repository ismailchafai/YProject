package org.sid.springsecurity.dao.communDao;

import org.sid.springsecurity.bean.communBean.Facture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactureDao extends JpaRepository<Facture , Long> {
    Facture findByRef(String ref);
    int deleteByRef(String ref);
    Facture findByLocationRef(String ref);
}

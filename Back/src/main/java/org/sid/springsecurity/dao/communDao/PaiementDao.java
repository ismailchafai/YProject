package org.sid.springsecurity.dao.communDao;

import org.sid.springsecurity.bean.communBean.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaiementDao extends JpaRepository<Paiement,Long > {
    Paiement findByRef(String ref);
    int deleteByRef(String ref);
}

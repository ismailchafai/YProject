package org.sid.springsecurity.dao.appartementDao;

import org.sid.springsecurity.bean.appartementBean.AgenceAppartement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgenceAppartementDao extends JpaRepository<AgenceAppartement,Long> {
    AgenceAppartement findByIceAgApp(Long iceAgApp);

    int deleteByIceAgApp(Long iceAgApp);
    AgenceAppartement findByUsername(String username);
}

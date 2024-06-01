package org.sid.springsecurity.dao.voitureDao;

import org.sid.springsecurity.bean.voitureBean.AgenceLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgenceLocationDao extends JpaRepository<AgenceLocation,Long> {
    AgenceLocation findByIceAgLoc(Long iceAgLoc);
    int deleteByIceAgLoc(Long iceAgLoc);
    AgenceLocation findByUsername(String username);
}

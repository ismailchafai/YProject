package org.sid.springsecurity.dao.communDao;

import org.sid.springsecurity.bean.communBean.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface ClientDao extends JpaRepository<Client , Long> {
    Client findByCin(String cin);
    int deleteByCin(String cin);
//    List<Client> findByReservationRef(String ref);
//    int deleteByReservationRef(Long id);


    Client findByUsername(String username);
}

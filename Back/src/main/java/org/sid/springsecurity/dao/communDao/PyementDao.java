package org.sid.springsecurity.dao.communDao;
import org.sid.springsecurity.bean.communBean.Pyement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PyementDao extends JpaRepository<Pyement,Long > {
}

package org.sid.springsecurity.dao.communDao;


import org.sid.springsecurity.bean.communBean.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationDao extends JpaRepository<Location,Long > {
    Location findByRef(String ref);
    Location findByIdLocation(Long id);
    @Query(value = "SELECT MONTH(l.date_debut) AS mois, COUNT(*) AS nombreDeLocations FROM Location l GROUP BY MONTH(l.date_debut) ORDER BY MONTH(l.date_debut)",nativeQuery = true)
//    List<Location> countLocationsByMonth();
    List<Location> countLocationsByMonth();




    int deleteByRef(String ref);
    Location findLocationByReservationRef(String ref);
}

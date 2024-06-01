package org.sid.springsecurity.service.facade.communService;


import org.sid.springsecurity.bean.communBean.Location;

import java.util.List;
import java.util.Map;

public interface LocationService {
    int save(Location location);
    List<Location> findAll();

    Location findByRef(String ref);

    Map<Integer, Long> countLocationsByMonth(String username);

    int deleteByRef(String ref);
    Map<Integer, Long> countLocationsByMonth();

    int update(Location voiture);

    Location findLocationByReservationRef(String ref);
}

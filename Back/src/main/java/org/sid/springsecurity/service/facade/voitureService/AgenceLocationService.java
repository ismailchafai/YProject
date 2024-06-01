package org.sid.springsecurity.service.facade.voitureService;


import org.sid.springsecurity.bean.photo.ImageModule;
import org.sid.springsecurity.bean.voitureBean.AgenceLocation;

import java.util.List;

public interface AgenceLocationService {


    int save(AgenceLocation agenceLocation);

    AgenceLocation findByiceAgLoc(Long iceAgLoc);

    List<AgenceLocation> findAll();



    int update(AgenceLocation agenceLocation);

    int deleteByIceAgLoc(Long iceAgLoc);

    AgenceLocation findByUsername(String username);


}

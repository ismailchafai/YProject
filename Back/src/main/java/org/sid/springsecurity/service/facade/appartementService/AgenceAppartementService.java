package org.sid.springsecurity.service.facade.appartementService;


import org.sid.springsecurity.bean.appartementBean.AgenceAppartement;
import org.sid.springsecurity.bean.photo.ImageModule;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AgenceAppartementService {
    int save(AgenceAppartement agenceAppartement);
    List<AgenceAppartement> findAll();
    int update(AgenceAppartement propAppartemenet);
    AgenceAppartement findByIceAgApp(Long iceAgApp);
    @Transactional
    int deleteByIceAgApp(Long iceAgApp);

    AgenceAppartement findByUsername(String username);

}

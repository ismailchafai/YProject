package org.sid.springsecurity.service.facade.communService;

import org.sid.springsecurity.bean.communBean.Paiement;
import org.sid.springsecurity.bean.communBean.Pyement;

import java.util.List;

public interface PyementService {
    List<Pyement> findAll();

    int save(Pyement pyement);
}
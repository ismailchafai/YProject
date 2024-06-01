package org.sid.springsecurity.service.facade.communService;


import org.sid.springsecurity.bean.communBean.Facture;

import java.util.List;

public interface FactureService {
    int save(Facture facture);
    Facture findByRef(String ref);
    List<Facture> findAll();
    int deleteByRef(String ref);

    int update(Facture facture);
}

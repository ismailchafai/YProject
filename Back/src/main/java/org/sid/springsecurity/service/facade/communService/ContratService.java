package org.sid.springsecurity.service.facade.communService;


import org.sid.springsecurity.bean.communBean.Contrat;
import org.sid.springsecurity.bean.communBean.Location;

import java.util.List;

public interface ContratService {
    int save(Contrat contrat);


    Contrat findByNumContrat(int numContrat);
    List<Contrat> findAll();
    int deleteByNumContrat(int numContrat);
    int update(Contrat contrat);
}

package org.sid.springsecurity.service.facade.communService;


import org.sid.springsecurity.bean.communBean.Client;

import java.util.List;

public interface ClientService {
    int save(Client client);

    Client findByCin(String cin);

    List<Client> findAll();

    int update(Client client);

    int deleteByCin(String cin);

    Client findByUsername(String username);
}

package org.sid.springsecurity.ws.facade.communWs;

import org.sid.springsecurity.bean.communBean.Client;
import org.sid.springsecurity.service.facade.communService.ClientService;
import org.sid.springsecurity.ws.converter.communConverter.ClientConverter;
import org.sid.springsecurity.ws.dto.communDto.ClientDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client/")
public class ClientWs {
    private ClientService clientService;
    @Autowired
    private ClientConverter converter ;

    public ClientWs(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    public int save(@RequestBody ClientDto clientDto) {
        Client client =converter.toBean(clientDto);
        return clientService.save(client);
    }

    @GetMapping("cin/{cin}")
    public ClientDto findByCin(@PathVariable String cin) {
        return converter.toDto(clientService.findByCin(cin));
    }

    @GetMapping
    public List<ClientDto> findAll() {
        return converter.toDto(clientService.findAll());
    }

    @PutMapping
    public int update(@RequestBody ClientDto clientDto) {
        Client client= converter.toBean(clientDto);
       return clientService.update(client);
    }

    @Transactional
    @DeleteMapping("cin/{cin}")
    public int deleteByCin(String cin) {
        return clientService.deleteByCin(cin);
    }



    @GetMapping("username/{username}")
    public ClientDto findByUsername(@PathVariable  String username) {
        Client client=clientService.findByUsername(username);
        System.out.println(client);

        return converter.toDto(clientService.findByUsername(username));
    }
}

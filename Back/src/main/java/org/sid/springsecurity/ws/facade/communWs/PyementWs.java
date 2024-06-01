package org.sid.springsecurity.ws.facade.communWs;

import org.sid.springsecurity.bean.communBean.Paiement;
import org.sid.springsecurity.bean.communBean.Pyement;
import org.sid.springsecurity.service.facade.communService.PyementService;
import org.sid.springsecurity.ws.converter.communConverter.PaiementConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/safarent/manager/")
public class PyementWs {

    @Autowired
    private PaiementConverter convertir;
    @Autowired
    private PyementService pyementService;

@PostMapping("")
    public int save(@RequestBody Pyement paiement) {
        return pyementService.save(paiement);
    }
@GetMapping
    public List<Pyement> findAll() {
        return pyementService.findAll();
    }

}

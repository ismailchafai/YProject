package org.sid.springsecurity.ws.facade.communWs;

import org.sid.springsecurity.bean.communBean.Paiement;
import org.sid.springsecurity.service.facade.communService.PaiementService;
import org.sid.springsecurity.ws.converter.communConverter.PaiementConverter;
import org.sid.springsecurity.ws.dto.communDto.PaiementDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paiement/")
public class PaiementWs {
    private PaiementService paiementService;
    @Autowired
    private PaiementConverter converter;

    public PaiementWs(PaiementService paiementService) {
        this.paiementService = paiementService;
    }

    @PostMapping
    public int save(@RequestBody PaiementDto paiementDto) {
       Paiement paiement = converter.toBean(paiementDto);
        return paiementService.save(paiement);
    }

    @GetMapping("ref/{ref}")
    public PaiementDto findByRef(@PathVariable String ref) {
        return converter.toDto(paiementService.findByRef(ref));
    }


    @GetMapping
    public List<PaiementDto> findAll() {
        return converter.toDto(paiementService.findAll());
    }
    @PutMapping
    public int update(@RequestBody PaiementDto paiementDto) {
        Paiement paiement= converter.toBean(paiementDto);
        return paiementService.update(paiement);
    }

    @Transactional
    @DeleteMapping("ref/{ref}")
    public int deleteByRef(String ref) {
        return paiementService.deleteByRef(ref);
    }
}

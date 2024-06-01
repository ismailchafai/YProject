package org.sid.springsecurity.ws.facade.communWs;

import org.sid.springsecurity.bean.communBean.Facture;
import org.sid.springsecurity.service.facade.communService.FactureService;
import org.sid.springsecurity.ws.converter.communConverter.FactureConverter;
import org.sid.springsecurity.ws.dto.communDto.FactureDto;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facture/")
public class FactureWs {
    public FactureWs(FactureService factureService, FactureConverter factureConverter) {
        this.factureService = factureService;
        this.factureConverter = factureConverter;
    }

    @PostMapping
    public int save(@RequestBody FactureDto factureDto) {
        Facture facture = factureConverter.toBean(factureDto);
        return factureService.save(facture);
    }
    @GetMapping("ref/{ref}")
    public FactureDto findByRef(@PathVariable String ref) {
        return factureConverter.toDto(factureService.findByRef(ref));
    }
    @GetMapping
    public List<FactureDto> findAll() {
        return factureConverter.toDto(factureService.findAll());
    }
    @Transactional
    @DeleteMapping("ref/{ref}")
    public int deleteByRef(@PathVariable String ref) {
        return factureService.deleteByRef(ref);
    }
    @PutMapping
    public int update(@RequestBody FactureDto factureDto) {
        Facture facture = factureConverter.toBean(factureDto);
        return factureService.update(facture);
    }


    private FactureService factureService;
    private FactureConverter factureConverter ;
}

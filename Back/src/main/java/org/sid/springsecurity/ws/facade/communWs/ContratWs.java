package org.sid.springsecurity.ws.facade.communWs;

import org.sid.springsecurity.bean.communBean.Contrat;
import org.sid.springsecurity.service.facade.communService.ContratService;
import org.sid.springsecurity.ws.converter.communConverter.ContratConverter;
import org.sid.springsecurity.ws.dto.communDto.ContratDto;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contrat/")
public class ContratWs {
    public ContratWs(ContratService contratService, ContratConverter contratConverter) {
        this.contratService = contratService;
        this.contratConverter = contratConverter;
    }

    @PostMapping
    public int save(@RequestBody ContratDto contratDto) {
        Contrat contrat = contratConverter.toBean(contratDto);
        return contratService.save(contrat);

    }
    @GetMapping("numContrat/{numContrat}")
    public ContratDto findByNumContrat(@PathVariable int numContrat) {
        return contratConverter.toDto(contratService.findByNumContrat(numContrat));
    }
    @GetMapping
    public List<ContratDto> findAll() {
        return contratConverter.toDto(contratService.findAll());
    }
    @Transactional
    @DeleteMapping("numContrat/{numContrat}")
    public int deleteByNumContrat(@PathVariable int numContrat) {
        return contratService.deleteByNumContrat(numContrat);
    }
    @PutMapping
    public int update(@RequestBody ContratDto contratDto) {
        Contrat contrat = contratConverter.toBean(contratDto);
        return contratService.update(contrat);
}

    private ContratService contratService ;
    private ContratConverter contratConverter ;
}

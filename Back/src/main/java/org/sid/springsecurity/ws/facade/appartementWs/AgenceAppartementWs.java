package org.sid.springsecurity.ws.facade.appartementWs;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.sid.springsecurity.bean.appartementBean.AgenceAppartement;
import org.sid.springsecurity.bean.photo.ImageModule;
import org.sid.springsecurity.security.util.uploadImage.ConverterImage;
import org.sid.springsecurity.service.facade.appartementService.AgenceAppartementService;
import org.sid.springsecurity.ws.converter.appartementConverter.AgenceAppartementConverter;
import org.sid.springsecurity.ws.dto.appartementDto.AgenceAppartementDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/agenceAppartement/")
public class AgenceAppartementWs {
    @PostMapping
    public int save(@RequestBody AgenceAppartementDto agenceAppartementDto) {
        return agenceAppartementService.save(agenceAppartementConverter.toBean(agenceAppartementDto));
    }


    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ConverterImage converterImage;

    @GetMapping
    @PostAuthorize("hasAnyAuthority('ADMIN')")
    public List<AgenceAppartementDto> findAll() {
        return agenceAppartementConverter.toDto(agenceAppartementService.findAll());
    }

    @GetMapping("cin/{iceAgApp}")
    @PostAuthorize("hasAnyAuthority('ADMIN')")
    public AgenceAppartementDto findByIceAgApp(@PathVariable Long iceAgApp) {
        return agenceAppartementConverter.toDto(agenceAppartementService.findByIceAgApp(iceAgApp));
    }

    @DeleteMapping("cin/{iceAgApp}")
    @PostAuthorize("hasAnyAuthority('ADMIN')")
    public int deleteByIceAgApp(@PathVariable Long iceAgApp) {
        return agenceAppartementService.deleteByIceAgApp(iceAgApp);
    }


    @PutMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public int update(
            @RequestPart("agenceAppartemet") AgenceAppartementDto agenceAppartementDto,
            @RequestPart("logo") MultipartFile file
    )
    {
        try {
            AgenceAppartement agenceAppartement=agenceAppartementConverter.toBean(agenceAppartementDto);
            String logo =converterImage.uploadImage(file);
            agenceAppartement.setImagePaths(logo);
            return agenceAppartementService.update(agenceAppartement);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("-9999999");
            return -99999;
        }
    }

    @GetMapping("/username/{username}")
    public AgenceAppartement findByUsername(@PathVariable  String username) {
        return agenceAppartementService.findByUsername(username);
    }


    private final AgenceAppartementService agenceAppartementService;
    private final AgenceAppartementConverter agenceAppartementConverter;

    public AgenceAppartementWs(AgenceAppartementService agenceAppartementService, AgenceAppartementConverter agenceAppartementConverter) {
        this.agenceAppartementService = agenceAppartementService;
        this.agenceAppartementConverter = agenceAppartementConverter;
    }



}

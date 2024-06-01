package org.sid.springsecurity.ws.facade.appartementWs;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.sid.springsecurity.bean.appartementBean.Appartement;
import org.sid.springsecurity.security.util.uploadImage.ConverterImage;
import org.sid.springsecurity.service.facade.appartementService.AppartementService;
import org.sid.springsecurity.ws.converter.appartementConverter.AppartementConverter;
import org.sid.springsecurity.ws.dto.appartementDto.AppartementDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/appartement/")
public class AppartementWs {

    @Autowired
    private Cloudinary cloudinary;


    @Autowired
    private ConverterImage converterImage;

    //mohammed ezzaim
    public AppartementWs(AppartementService appartementService, AppartementConverter appartementConverter) {
        this.appartementService = appartementService;
        this.appartementConverter = appartementConverter;
    }


        @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
        public @ResponseBody int save(@RequestPart("apartment") AppartementDto appartementDto,
                                      @RequestPart("imageFile") MultipartFile[] files) {
            try {
                Appartement appartement = appartementConverter.toBean(appartementDto);
                Set<String> fileUrls = converterImage.uploadImages(files);
                appartement.setImagePaths(fileUrls);
                return appartementService.save(appartement);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return -99;
            }
        }


        @DeleteMapping("/images/cloudinary/{imageUrl}")
        public void deleteImage(@PathVariable String imageUrl) throws IOException {
            String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            cloudinary.uploader().destroy(fileName, ObjectUtils.emptyMap());
        }


//
//    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
//    public @ResponseBody int save(@RequestPart("apartment") AppartementDto appartementDto,
//                                      @RequestPart("imageFile")MultipartFile[] file) {
//        try{
//            Appartement appartement=appartementConverter.toBean(appartementDto);
//            Set<ImageModule> images=uploadImage(file);
//            appartement.setImages(images);
//            return   appartementService.save(appartement);
//
//        }catch(Exception e){
//            System.out.println(e.getMessage());
//            return -99;
//        }
//    }


//
//    public Set<ImageModule> uploadImage(MultipartFile[] multipartFiles) throws IOException {
//        Set<ImageModule> imageModuleSet=new HashSet<>();
//        for(MultipartFile file :multipartFiles){
//            ImageModule imageModule=new ImageModule(
//                    file.getOriginalFilename(),
//                    file.getContentType(),
//                    file.getBytes());
//            imageModuleSet.add(imageModule);
//        }
//        return imageModuleSet;
//    }

    @GetMapping("/public")
    public List<AppartementDto> findAll() {
        return appartementConverter.toDto(appartementService.findAll());
    }

    @GetMapping("/CategorieAppartementLibelle/{libelle}/PropAppartementUsername/{username}")
    public List<AppartementDto> findByCategoriesAppartementLibelleAndAgenceAppartementUsername(@PathVariable String libelle, @PathVariable String username) {
        return appartementConverter.toDto(appartementService.findByCategoriesAppartementLibelleAndAgenceAppartementUsername(libelle, username));
    }

    @GetMapping("listAppartementCategories/{libelle}")
    public List<AppartementDto> findByCategoriesAppartementLibelle(@PathVariable String libelle) {
        return appartementConverter.toDto(appartementService.findByCategoriesAppartementLibelle(libelle));
    }

    @GetMapping("listAppartementCin/{iceAgApp}")
    public List<AppartementDto> findByPropAppartementCin(@PathVariable Long iceAgApp) {
        return appartementConverter.toDto(appartementService.findByAgenceAppartementIceAgApp(iceAgApp));
    }

    @GetMapping("public/code/{code}")
    public AppartementDto findByCode(@PathVariable String code) {
        return appartementConverter.toDto(appartementService.findByCode(code));
    }

    @DeleteMapping("code/{code}")
    public int deleteByCode(@PathVariable String code) {
        return appartementService.deleteByCode(code);
    }

    @PutMapping
    public int update(@RequestBody AppartementDto appartementDto) {
        return appartementService.update(appartementConverter.toBean(appartementDto));
    }

    @GetMapping("/adresse/{adresse}")
    public List<Appartement> findByAdresse(@PathVariable String adresse) {
        return appartementService.findByAdresse(adresse);
    }

    @GetMapping("/LoyerMensuel/{mont}")
    public List<Appartement> findByLoyerMensuelLessThanEqual(@PathVariable double mont) {
        return appartementService.findByLoyerMensuelLessThanEqual(mont);
    }

    private final AppartementService appartementService;

    private final AppartementConverter appartementConverter;

}

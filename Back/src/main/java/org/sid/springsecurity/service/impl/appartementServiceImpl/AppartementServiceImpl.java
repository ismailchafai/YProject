package org.sid.springsecurity.service.impl.appartementServiceImpl;
import org.sid.springsecurity.bean.appartementBean.Appartement;
import org.sid.springsecurity.bean.appartementBean.CategoriesAppartement;
import org.sid.springsecurity.bean.appartementBean.AgenceAppartement;
import org.sid.springsecurity.bean.photo.ImageModule;
import org.sid.springsecurity.dao.appartementDao.AppartementDao;
import org.sid.springsecurity.service.facade.appartementService.AppartementService;
import org.sid.springsecurity.service.facade.appartementService.CategoriesAppartementService;
import org.sid.springsecurity.service.facade.appartementService.AgenceAppartementService;
import org.sid.springsecurity.service.facade.communService.ReservationService;
import org.sid.springsecurity.ws.converter.appartementConverter.AppartementConverter;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
@Lazy
@Service
public class AppartementServiceImpl implements AppartementService {
    private final AppartementDao appartementDao;
    private final AppartementConverter appartementConverter;

    private final CategoriesAppartementService categoriesAppartementService;
    private final AgenceAppartementService agenceAppartementService;

    private final ReservationService reservationService;

    public AppartementServiceImpl(AppartementDao appartementDao, AppartementConverter appartementConverter, CategoriesAppartementService categoriesAppartementService, AgenceAppartementService agenceAppartementService, ReservationService reservationService) {
        this.appartementDao = appartementDao;
        this.appartementConverter = appartementConverter;
        this.categoriesAppartementService = categoriesAppartementService;
        this.agenceAppartementService = agenceAppartementService;
        this.reservationService = reservationService;
    }


//    @Override
//    public List<ImageModule> getImagesByProductRef(String code) {
//        Appartement appartement = appartementDao.findByCode(code);
//        if (appartement != null) {
//            return new ArrayList<>(appartement.getImages());
//        }
//        return Collections.emptyList();
//    }


    @Override
    public int save(Appartement appartement) {

         if (appartementDao.findByCode(appartement.getCode()) != null) {
            return -2;
        }
        else {
            String libelle=appartement.getCategoriesAppartement().getLibelle();
            Long iceAgApp=appartement.getAgenceAppartement().getIceAgApp();
            CategoriesAppartement categoriesAppartement = categoriesAppartementService.findByLibelle(libelle);
            AgenceAppartement agenceAppartement = agenceAppartementService.findByIceAgApp(iceAgApp);

            if (categoriesAppartement == null || agenceAppartement == null) {
                return -3;
            }
            if (categoriesAppartementService.findByLibelle(categoriesAppartement.getLibelle()) != null ||
                    agenceAppartementService.findByIceAgApp(agenceAppartement.getIceAgApp()) != null ) {
                appartement.setCategoriesAppartement(categoriesAppartement);
                appartement.setAgenceAppartement(agenceAppartement);
            }
            appartement.setCode(UUID.randomUUID().toString());
            appartementDao.save(appartement);
            return 1;
        }
    }
    @Override
    public List<Appartement> findAll() {
        return appartementDao.findAll();
    }

    @Override
    public Appartement findByCode(String code) {
        return appartementDao.findByCode(code);
    }
    @Transactional
    @Override
    public int deleteByCode(String code) {
        return appartementDao.deleteByCode(code);
    }
    @Override
    public List<Appartement> findByCategoriesAppartementLibelleAndAgenceAppartementUsername(String libelle, String username) {
        return appartementDao.findByCategoriesAppartementLibelleAndAgenceAppartementUsername(libelle, username);
    }

    @Override
    public int update(Appartement appartementNv) {
        if (appartementNv == null) {
            return -1;
        }

        String code = appartementNv.getCode();

        if (code == null || code.isEmpty()) {
            return -2;
        }

        Appartement appartement = appartementDao.findByCode(code);
        System.out.println(appartement);
        if (appartement == null) {
            return -3;
        }

        String libelle=appartementNv.getCategoriesAppartement().getLibelle();
        Long iceAgApp=appartementNv.getAgenceAppartement().getIceAgApp();

        if(libelle==null  || iceAgApp==null || iceAgApp==0 || libelle.isEmpty()){

            return -5;
        }

        CategoriesAppartement categoriesAppartement=categoriesAppartementService.findByLibelle(libelle);
        AgenceAppartement agenceAppartement = agenceAppartementService.findByIceAgApp(iceAgApp);

        appartement.setCode(appartementNv.getCode());
        appartement.setSuperficie(appartementNv.getSuperficie());
        appartement.setAdresse(appartementNv.getAdresse());

        appartement.setVille(appartementNv.getVille());
        appartement.setWifi(appartementNv.getWifi());
        appartement.setNmbrPersont(appartementNv.getNmbrPersont());
        appartement.setClimatiseur(appartementNv.getClimatiseur());

        appartement.setLoyerMensuel(appartementNv.getLoyerMensuel());

        if(categoriesAppartement!=null){
            appartement.setCategoriesAppartement(categoriesAppartement);
        }
        if(agenceAppartement !=null){
            appartement.setAgenceAppartement(agenceAppartement);
        }
        appartementDao.save(appartement);
        return 1;
    }

    @Override
    public List<Appartement> findByCategoriesAppartementLibelle(String libelle) {
        return appartementDao.findByCategoriesAppartementLibelle(libelle);
    }

    @Override
    public List<Appartement> findByAgenceAppartementIceAgApp(Long iceAgApp) {
        return appartementDao.findByAgenceAppartementIceAgApp(iceAgApp);
    }
    @Override
    public List<Appartement> findByAdresse(String adresse){
        return appartementDao.findByAdresse(adresse);
    }

    @Override
    public List<Appartement> findByLoyerMensuelLessThanEqual(double mont) {
        return appartementDao.findByLoyerMensuelLessThanEqual(mont);
    }
}

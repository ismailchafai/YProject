package org.sid.springsecurity.service.impl.communServiceImpl;

import org.sid.springsecurity.bean.communBean.Contrat;
import org.sid.springsecurity.bean.communBean.Location;
import org.sid.springsecurity.dao.communDao.ContratDao;
import org.sid.springsecurity.service.facade.communService.ContratService;
import org.sid.springsecurity.service.facade.communService.LocationService;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class ContratServiceImpl implements ContratService {
    private ContratDao contratDao ;
    private LocationService locationService;

    public ContratServiceImpl(ContratDao contratDao,@Lazy LocationService locationService) {
        this.contratDao = contratDao;
        this.locationService = locationService;
    }

    @Override
    public int save(Contrat contrat) {
        if (contrat == null) {
            System.out.println("Contrat null");
            return -1;
        }
        if (contrat.getNumContrat() == 0) {
            System.out.println(" numContrat est null");
            return -2;
        }

        if (findByNumContrat(contrat.getNumContrat()) != null) {
            System.out.println("contrat (numContrat) deja existed");
            return -3;
        }
        Location location = locationService.findByRef(contrat.getLocation().getRef());

        if(contrat.getLocation().getRef()==null){
            System.out.println("ref de location null");
            return -4;
        }
        if (location == null) {
            System.out.println("location est null");
            return -5;
        }
        if (contrat.getPrixHT()<contrat.getRest()) {
            System.out.println("reste < pritht ");
            return -6;
        }
        String ref = contrat.getLocation().getRef();
        if(contratDao.findByLocationRef(ref) != null){
            System.out.println("ref location deja existe");
            return -7 ;
        }


        contrat.setLocation(location);
        contratDao.save(contrat);
        return 1;
    }

    @Override
    public Contrat findByNumContrat(int numContrat) {
        return contratDao.findByNumContrat(numContrat);
    }

    @Override
    public List<Contrat> findAll() {
        return contratDao.findAll();
    }

    @Transactional
    @Override
    public int deleteByNumContrat(int numContrat) {
        return contratDao.deleteByNumContrat(numContrat);
    }



    @Override
    public int update(Contrat contrat) {
        Contrat existingContrat = findByNumContrat(contrat.getNumContrat());

        if (existingContrat == null) {
            return -1;
        }

        try {

            if (contrat.getLocation() == null) {
                return -2;
            }
            if (contrat.getLocation().getRef() == null) {
                return -3;
            }
            if(locationService.findByRef(contrat.getLocation().getRef())==null){
                return -4;
            }
            if (contrat.getLocation() != null) {
                Location location = locationService.findByRef(contrat.getLocation().getRef());
                contrat.setLocation(location);
            }
            existingContrat.setDateSignature(contrat.getDateSignature());
            existingContrat.setDureeRetard(contrat.getDureeRetard());
            existingContrat.setModelePaiement(contrat.getModelePaiement());
            existingContrat.setPrixHT(contrat.getPrixHT());
            existingContrat.setTva(contrat.getTva());
            existingContrat.setRest(contrat.getRest());
            contratDao.save(existingContrat);

            return 1;

        } catch (Exception e) {
            System.err.println("Erreur lors de la mise à jour de la contrat : " + e.getMessage());
            e.printStackTrace();
            return -6;
        }
    }




//    @Override
//    public int update(ContratDto contratDto) {
//        System.out.println(contratDto.getNumContrat());
//        System.out.println(contratDto.getDateSignature());
//        System.out.println(contratDto.getPrixHT());
//        System.out.println(contratDto.getTva());
//        if(contratDto == null){
//            return -1 ;
//        }
//        int numContra = contratDto.getNumContrat();
//        if(numContra == 0){
//            return -2 ;
//        }
//        Contrat contrat = contratDao.findByNumContrat(numContra);
//        if(contrat == null){
//            return -3 ;
//        }
//        Location location = locationDao.findByRef(contrat.getLocation().getRef());
//        if (location == null) {
//            System.out.println("location est null");
//            return -4;
//        }
//        if (locationDao.findByRef(location.getRef()) == null) {
//            System.out.println("Cette location n'existe pas");
//            return -5;
//        }
//
//        contrat.setLocation(location);
//        BeanUtils.copyProperties(contratDto , contrat);
//        contratDao.save(contrat);
//        return 1;
//    }


}



package org.sid.springsecurity.service.impl.communServiceImpl;

import org.sid.springsecurity.bean.communBean.Facture;
import org.sid.springsecurity.bean.communBean.Location;
import org.sid.springsecurity.bean.communBean.Paiement;
import org.sid.springsecurity.dao.communDao.FactureDao;
import org.sid.springsecurity.service.facade.communService.FactureService;
import org.sid.springsecurity.service.facade.communService.LocationService;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class FactureServiceImpl implements FactureService {
    private FactureDao factureDao ;
    private LocationService locationService ;


    public FactureServiceImpl( FactureDao factureDao,@Lazy LocationService locationService) {
        this.factureDao = factureDao;
        this.locationService = locationService;
    }

    @Override
    public int save(Facture facture) {
        Paiement paiement = null ;
        if (facture == null) {
            System.out.println("facture null");
            return -1 ;
        }
        if (facture.getRef()==null){
            return -2;
        }
        if (findByRef(facture.getRef()) != null) {
            System.out.println("facture (ref) deja existed");
            return -3;
        }

        Location location = locationService.findByRef(facture.getLocation().getRef());

        if(facture.getLocation().getRef()==null){
            System.out.println("ref de location null");
            return -4;
        }

        if(location==null ){
            System.out.println("location null");
            return -5;
        }
        String ref = facture.getLocation().getRef();
        if(factureDao.findByLocationRef(ref)!=null){
            System.out.println("ref location deja existe");
            return -6;
        }

        facture.setPaiement(paiement);
        facture.setLocation(location);
        factureDao.save(facture);
        return 1;
   }





        @Override
    public Facture findByRef(String ref) {
        return factureDao.findByRef(ref);
    }

    @Override
    public List<Facture> findAll() {
        return factureDao.findAll();
    }


    @Transactional
    @Override
    public int deleteByRef(String ref) {
        return factureDao.deleteByRef(ref);
    }


    @Override
    public int update(Facture facture) {
        Facture existingFacture = findByRef(facture.getRef());

        if (existingFacture == null) {
            return -1;
        }

        try {
            if ( facture.getLocation() == null) {
                return -2;
            }
//            if (facture.getPaiement() == null || facture.getLocation() == null) {
//                return -2;
//            }
            if (facture.getLocation().getRef() == null) {
                return -3;
            }
            if(locationService.findByRef(facture.getLocation().getRef())==null){
                return -5;
            }
//            if (facture.getPaiement().getRef() == null || facture.getLocation().getRef() == null) {
//                return -3;
//            }
            //Paiement paiement = paiementService.findByRef(facture.getPaiement().getRef());
            Location location = locationService.findByRef(facture.getLocation().getRef());


//            existingFacture.setPaiement(facture.getPaiement());
            existingFacture.setLocation(location);
            existingFacture.setDateFacture(facture.getDateFacture());
            existingFacture.setMontantTotal(facture.getMontantTotal());
            factureDao.save(existingFacture);
            return 1;

        } catch (Exception e) {
            System.err.println("Erreur lors de la mise à jour de la facteur : " + e.getMessage());
            e.printStackTrace();
            return -4;
        }
    }
}


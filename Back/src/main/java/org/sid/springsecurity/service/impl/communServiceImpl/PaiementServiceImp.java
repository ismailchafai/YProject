package org.sid.springsecurity.service.impl.communServiceImpl;

import org.sid.springsecurity.bean.appartementBean.AgenceAppartement;
import org.sid.springsecurity.bean.communBean.Facture;
import org.sid.springsecurity.bean.communBean.Paiement;
import org.sid.springsecurity.bean.voitureBean.AgenceLocation;
import org.sid.springsecurity.dao.communDao.PaiementDao;
import org.sid.springsecurity.service.facade.appartementService.AgenceAppartementService;
import org.sid.springsecurity.service.facade.communService.FactureService;
import org.sid.springsecurity.service.facade.communService.PaiementService;
import org.sid.springsecurity.service.facade.voitureService.AgenceLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Lazy
@Service
public class PaiementServiceImp implements PaiementService {
    @Autowired
    private PaiementDao paiementDao;
    @Autowired
    private AgenceAppartementService agenceAppartementService;
    @Autowired
    private AgenceLocationService agenceLocationService;
    @Autowired
    private FactureService factureService ;



    public int save(Paiement paiement) {
        if (paiement.getRef() == null) return -1;
        paiementDao.save(paiement);

        return 1;


    }

    @Override
    public List<Paiement> findAll() {
        return paiementDao.findAll();
    }

    @Override
    public int update(Paiement paiement) {

        Paiement existingPaiement = findByRef(paiement.getRef());

        if (existingPaiement == null) {
            return -1;
        }

        try {
            if (paiement.getProp_appartement() == null || paiement.getAgenceLocation() == null) {
                return -2;
            }
            if (paiement.getProp_appartement().getIceAgApp() == null || paiement.getAgenceLocation().getIceAgLoc() == null || paiement.getFacture().getRef() == null) {
                return -3;
            }
            AgenceAppartement agenceAppartement = agenceAppartementService.findByIceAgApp(paiement.getProp_appartement().getIceAgApp());
            AgenceLocation agenceLocation = agenceLocationService.findByiceAgLoc(paiement.getAgenceLocation().getIceAgLoc());
            Facture facture=factureService.findByRef(paiement.getFacture().getRef());

            existingPaiement.setRibClient(paiement.getRibClient());
            existingPaiement.setDatePaiement(paiement.getDatePaiement());
            existingPaiement.setFacture(facture);
            existingPaiement.setAgenceLocation(agenceLocation);
            existingPaiement.setProp_appartement(agenceAppartement);



            paiementDao.save(existingPaiement);

            return 1;

        } catch (Exception e) {
            System.err.println("Erreur lors de la mise à jour de paiement : " + e.getMessage());
            e.printStackTrace();
            return -4;
        }
    }
    @Override
    public Paiement findByRef(String ref) {
        return paiementDao.findByRef(ref);
    }

    @Transactional
    @Override
    public int deleteByRef(String ref) {
        return paiementDao.deleteByRef(ref);
    }
}

package org.sid.springsecurity.service.impl.appartementServiceImpl;

import org.sid.springsecurity.bean.appartementBean.Appartement;
import org.sid.springsecurity.bean.appartementBean.AgenceAppartement;
import org.sid.springsecurity.bean.communBean.Client;
import org.sid.springsecurity.bean.communBean.Paiement;
import org.sid.springsecurity.bean.photo.ImageModule;
import org.sid.springsecurity.bean.voitureBean.AgenceLocation;
import org.sid.springsecurity.dao.appartementDao.AgenceAppartementDao;
import org.sid.springsecurity.security.bean.AppRole;
import org.sid.springsecurity.security.dao.AppRoleDao;
import org.sid.springsecurity.service.facade.appartementService.AgenceAppartementService;
import org.sid.springsecurity.ws.converter.appartementConverter.AgenceAppartementConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
@Service
public class AgenceAppartementServiceImpl implements AgenceAppartementService {
    private final AgenceAppartementDao agenceAppartementDao;
    private final AgenceAppartementConverter agenceAppartementConverter;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AppRoleDao appRoleDao;
    public AgenceAppartementServiceImpl(AgenceAppartementDao agenceAppartementDao, AgenceAppartementConverter agenceAppartementConverter) {
        this.agenceAppartementDao = agenceAppartementDao;
        this.agenceAppartementConverter = agenceAppartementConverter;
    }
    @Override
    public int save(AgenceAppartement agenceAppartement) {
        if(agenceAppartement ==null){
            return  -1;
        }

        else if (agenceAppartementDao.findByIceAgApp(agenceAppartement.getIceAgApp())!=null) {
            return  -2;
        }
        else {
            List<Client> clients= agenceAppartement.getClients();
            List<Paiement> paiements= agenceAppartement.getPaiements();
            List<Appartement> appartements= agenceAppartement.getAppartementList();
            if(clients!=null){
                agenceAppartement.setClients(clients);
            }
            if(paiements!=null){
                agenceAppartement.setPaiements(paiements);
            }
            if(appartements!=null){
                agenceAppartement.setAppartementList(appartements);
            }

        }
        String pw= agenceAppartement.getPassword();
        if (pw.isEmpty()) {
            return -3;
        }
        agenceAppartement.setPassword(passwordEncoder.encode(pw));
        AppRole appRole1=appRoleDao.findByRoleName("MANAGER-APT");
        AppRole appRole2=appRoleDao.findByRoleName("USER");
        agenceAppartement.getAppRoles().add(appRole1);
        agenceAppartement.getAppRoles().add(appRole2);
        if(agenceAppartement.getImagePaths()==null ||agenceAppartement.getImagePaths().isEmpty()){
            agenceAppartement.setImagePaths(null);
            return -99;
        }

      agenceAppartementDao.save(agenceAppartement);
        return 1;
    }
    @Override
    public List<AgenceAppartement> findAll() {
        return agenceAppartementDao.findAll();
    }

    @Override
    public int update(AgenceAppartement propAppartemenet) {
        if (propAppartemenet == null) {
            return -1;
        }

        Long iceAgApp = propAppartemenet.getIceAgApp();
        if (iceAgApp == null || iceAgApp==0) {
            return -2;
        }

        AgenceAppartement agenceAppartement = agenceAppartementDao.findByIceAgApp(iceAgApp);
        if (agenceAppartement == null) {
            return -3;
        }
        agenceAppartement.setIceAgApp(propAppartemenet.getIceAgApp());
        agenceAppartement.setRaisonSocialAg(propAppartemenet.getRaisonSocialAg());
        agenceAppartement.setNumTele(propAppartemenet.getNumTele());
        agenceAppartement.setEmail(propAppartemenet.getEmail());
        agenceAppartement.setAdresse(propAppartemenet.getAdresse());
        agenceAppartement.setNumCompteBkAgApp(propAppartemenet.getNumCompteBkAgApp());
        agenceAppartement.setRibAgenceApp(propAppartemenet.getRibAgenceApp());
        agenceAppartement.setRCAgApp(propAppartemenet.getRCAgApp());
        agenceAppartement.setUsername(propAppartemenet.getUsername());
        agenceAppartement.setImagePaths(propAppartemenet.getImagePaths());


        if(propAppartemenet.getImagePaths()!=null && !propAppartemenet.getImagePaths().isEmpty()){
            agenceAppartement.setImagePaths(propAppartemenet.getImagePaths());
        }else {
            agenceAppartement.setImagePaths(null);
        }

        agenceAppartementDao.save(agenceAppartement);
        return 1;
    }


    @Override
    public AgenceAppartement findByIceAgApp(Long iceAgApp) {
        return agenceAppartementDao.findByIceAgApp(iceAgApp);
    }

    @Transactional
    @Override
    public int deleteByIceAgApp(Long iceAgApp) {
        return agenceAppartementDao.deleteByIceAgApp(iceAgApp);
    }



    @Override
    public AgenceAppartement findByUsername(String username) {
        return agenceAppartementDao.findByUsername(username);
    }

}

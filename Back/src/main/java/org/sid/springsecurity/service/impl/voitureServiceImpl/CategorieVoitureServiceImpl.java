package org.sid.springsecurity.service.impl.voitureServiceImpl;

import org.sid.springsecurity.bean.appartementBean.CategoriesAppartement;
import org.sid.springsecurity.bean.voitureBean.CategorieVoiture;
import org.sid.springsecurity.dao.voitureDao.CategorieVoitureDao;
import org.sid.springsecurity.service.facade.voitureService.CategorieVoitureService;
import org.sid.springsecurity.ws.converter.voitureConverter.CategorieVoitureConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategorieVoitureServiceImpl implements CategorieVoitureService {


    @Autowired
    private CategorieVoitureDao categorieVoitureDao;
    @Autowired
    private CategorieVoitureConverter categorieVoitureConverter;

    @Override
    public int save(CategorieVoiture categorieVoiture) {
        try {
            if(categorieVoitureDao.findByLibelle(categorieVoiture.getLibelle())!=null){return -1;}
            if(categorieVoiture.getLibelle()==null){
                return -2;
            }

            categorieVoitureDao.save(categorieVoiture);
            return 1;

        } catch (Exception e) {
            System.err.println("Erreur lors de la sauvegarde de la categorie: " + e.getMessage());
            e.printStackTrace();
            return -4;
        }
    }


    @Override
    public int update(String libelle, String libelleNew) {

        if (libelle == null || libelle.isEmpty()) {
            return -1;
        }

        CategorieVoiture categorieVoiture = categorieVoitureDao.findByLibelle(libelle);
        if (categorieVoiture == null) {
            return -2;
        }

        categorieVoiture.setLibelle(libelleNew);
        categorieVoitureDao.save(categorieVoiture);
        return 1;
    }


    @Override
    public CategorieVoiture findByLibelle(String libelle) {
        return categorieVoitureDao.findByLibelle(libelle);
    }
    @Override
    public List<CategorieVoiture> findAll() {
        return categorieVoitureDao.findAll();
    }

    @Transactional
    @Override
    public int  deleteByLibelle(String libelle) {
        return  categorieVoitureDao.deleteByLibelle(libelle);
    }
}

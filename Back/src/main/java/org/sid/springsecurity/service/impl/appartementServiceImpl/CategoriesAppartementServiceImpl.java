package org.sid.springsecurity.service.impl.appartementServiceImpl;

import org.sid.springsecurity.bean.appartementBean.CategoriesAppartement;
import org.sid.springsecurity.dao.appartementDao.CategoriesAppartementDao;
import org.sid.springsecurity.service.facade.appartementService.CategoriesAppartementService;
import org.sid.springsecurity.ws.converter.appartementConverter.CategoriesAppartementConverter;
import org.sid.springsecurity.ws.dto.appartementDto.CategoriesAppartementDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class CategoriesAppartementServiceImpl implements CategoriesAppartementService {
    private final CategoriesAppartementConverter categoriesAppartementConverter;
    private final CategoriesAppartementDao categoriesAppartementDao;

    public CategoriesAppartementServiceImpl(   CategoriesAppartementConverter categoriesAppartementConverter, CategoriesAppartementDao categoriesAppartementDao) {
        this.categoriesAppartementConverter = categoriesAppartementConverter;
        this.categoriesAppartementDao = categoriesAppartementDao;
    }
    @Override
    public int save(CategoriesAppartement categoriesAppartement) {

        if (categoriesAppartement == null) {
            return -1;
        }

        if (categoriesAppartementDao.findByLibelle(categoriesAppartement.getLibelle()) != null) {
            return -2;
        }

       categoriesAppartementDao.save(categoriesAppartement);

        return 1;
    }

    @Override
    public List<CategoriesAppartement> findAll() {
        return categoriesAppartementDao.findAll();
    }

    @Override
    public int update(String libelle, String libelleNew) {

        if (libelle == null || libelle.isEmpty()) {
            return -1;
        }

        CategoriesAppartement categoriesAppartement = categoriesAppartementDao.findByLibelle(libelle);
        if (categoriesAppartement == null) {
            return -2;
        }

        categoriesAppartement.setLibelle(libelleNew);
        categoriesAppartementDao.save(categoriesAppartement);
        return 1;
    }

    @Override
    public CategoriesAppartement findByLibelle(String libelle) {
        return categoriesAppartementDao.findByLibelle(libelle);
    }

    @Transactional
    @Override
    public int deleteByLibelle(String libelle) {
        return categoriesAppartementDao.deleteByLibelle(libelle);
    }
}

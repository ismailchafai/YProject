package org.sid.springsecurity.ServiceTest.voitureServiceTest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.sid.springsecurity.bean.voitureBean.AgenceLocation;
import org.sid.springsecurity.bean.voitureBean.CategorieVoiture;
import org.sid.springsecurity.bean.voitureBean.Voiture;
import org.sid.springsecurity.dao.voitureDao.VoitureDao;
import org.sid.springsecurity.service.facade.communService.ReservationService;
import org.sid.springsecurity.service.facade.voitureService.AgenceLocationService;
import org.sid.springsecurity.service.facade.voitureService.CategorieVoitureService;
import org.sid.springsecurity.service.facade.voitureService.VoitureService;
import org.sid.springsecurity.service.impl.voitureServiceImpl.VoitureServiceImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class VoitureServiceTest {

    @Mock
    private VoitureDao voitureDao;

    @Mock
    private CategorieVoitureService categorieVoitureService;



    @InjectMocks
    private VoitureServiceImpl voitureService;

    private Voiture voiture;

    @BeforeEach
    public void setUp() {
        voiture = new Voiture();
        voiture.setMatricule("123ABC");
        voiture.setCategorieVoiture(new CategorieVoiture());
        voiture.setAgenceLocation(new AgenceLocation());
    }

    @Test
    public void testSaveVoiture_MissingCategorie() {
        voiture.setCategorieVoiture(null);
        int result = voitureService.save(voiture);
        assertEquals(-2, result);
    }

    @Test
    public void testSaveVoiture_MissingAgenceLocation() {
        voiture.setAgenceLocation(null);
        int result = voitureService.save(voiture);
        assertEquals(-3, result);
    }



}
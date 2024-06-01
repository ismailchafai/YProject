package org.sid.springsecurity.ServiceTest.appartementServiceTest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.sid.springsecurity.bean.appartementBean.Appartement;
import org.sid.springsecurity.bean.appartementBean.CategoriesAppartement;
import org.sid.springsecurity.bean.appartementBean.AgenceAppartement;
import org.sid.springsecurity.dao.appartementDao.AppartementDao;
import org.sid.springsecurity.service.facade.appartementService.CategoriesAppartementService;
import org.sid.springsecurity.service.facade.appartementService.AgenceAppartementService;
import org.sid.springsecurity.service.facade.communService.ReservationService;
import org.sid.springsecurity.service.impl.appartementServiceImpl.AppartementServiceImpl;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AppartementServiceTest {

    @Mock
    private AppartementDao appartementDao;

    @Mock
    private CategoriesAppartementService categoriesAppartementService;

    @Mock
    private AgenceAppartementService agenceAppartementService;

    @Mock
    private ReservationService reservationService;

    @InjectMocks
    private AppartementServiceImpl appartementService;

    private Appartement appartement;
    private CategoriesAppartement categoriesAppartement;
    private AgenceAppartement agenceAppartement;

    @BeforeEach
    public void setUp() {
        appartement = new Appartement();
        appartement.setCode("123");
        appartement.setSuperficie((int) 100.0);
        appartement.setAdresse("Test Address");
        // Set other properties as needed

        categoriesAppartement = new CategoriesAppartement();
        categoriesAppartement.setLibelle("Test Category");

        agenceAppartement = new AgenceAppartement();
        agenceAppartement.setIceAgApp(123456L);
    }

    @Test
    public void testSave_AppartementAlreadyExists() {
        when(appartementDao.findByCode(anyString())).thenReturn(new Appartement());
        int result = appartementService.save(appartement);
        assertEquals(-2, result);
    }





    // Add more test cases for other methods as needed
}

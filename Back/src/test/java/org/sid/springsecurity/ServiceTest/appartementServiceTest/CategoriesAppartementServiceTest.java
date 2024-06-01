package org.sid.springsecurity.ServiceTest.appartementServiceTest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.sid.springsecurity.bean.appartementBean.CategoriesAppartement;
import org.sid.springsecurity.dao.appartementDao.CategoriesAppartementDao;
import org.sid.springsecurity.service.impl.appartementServiceImpl.CategoriesAppartementServiceImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoriesAppartementServiceTest {

    @Mock
    private CategoriesAppartementDao categoriesAppartementDao;

    @InjectMocks
    private CategoriesAppartementServiceImpl categoriesAppartementService;

    private CategoriesAppartement categoriesAppartement;

    @BeforeEach
    public void setUp() {
        categoriesAppartement = new CategoriesAppartement();
        categoriesAppartement.setLibelle("Category");
        // Initialize other properties as needed
    }

    @Test
    public void testSave_CategoryAlreadyExists() {
        when(categoriesAppartementDao.findByLibelle(anyString())).thenReturn(new CategoriesAppartement());
        int result = categoriesAppartementService.save(categoriesAppartement);
        assertEquals(-2, result);
    }

    @Test
    public void testSave_Success() {
        when(categoriesAppartementDao.findByLibelle(anyString())).thenReturn(null);
        int result = categoriesAppartementService.save(categoriesAppartement);
        assertEquals(1, result);
    }

    @Test
    public void testUpdate_CategoryNotFound() {
        when(categoriesAppartementDao.findByLibelle(anyString())).thenReturn(null);
        int result = categoriesAppartementService.update("OldCategory", "NewCategory");
        assertEquals(-2, result);
    }

    // Add more test cases for other methods as needed
}

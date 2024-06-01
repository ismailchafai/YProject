package org.sid.springsecurity.ServiceTest.voitureServiceTest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.sid.springsecurity.bean.voitureBean.CategorieVoiture;
import org.sid.springsecurity.dao.voitureDao.CategorieVoitureDao;
import org.sid.springsecurity.service.impl.voitureServiceImpl.CategorieVoitureServiceImpl;
import org.sid.springsecurity.ws.converter.voitureConverter.CategorieVoitureConverter;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategorieVoitureServiceTest {

    @Mock
    private CategorieVoitureDao categorieVoitureDao;

    @Mock
    private CategorieVoitureConverter categorieVoitureConverter;

    @InjectMocks
    private CategorieVoitureServiceImpl categorieVoitureServiceImpl;

    private CategorieVoiture categorieVoiture;

    @BeforeEach
    public void setUp() {
        categorieVoiture = new CategorieVoiture();
        categorieVoiture.setLibelle("SUV");
    }

    @Test
    public void testSave_CategorieVoitureAlreadyExists() {
        when(categorieVoitureDao.findByLibelle(anyString())).thenReturn(categorieVoiture);
        int result = categorieVoitureServiceImpl.save(categorieVoiture);
        assertEquals(-1, result);
    }

    @Test
    public void testSave_CategorieVoitureLibelleIsNull() {
        categorieVoiture.setLibelle(null);
        int result = categorieVoitureServiceImpl.save(categorieVoiture);
        assertEquals(-2, result);
    }

    @Test
    public void testSave_Success() {
        when(categorieVoitureDao.findByLibelle(anyString())).thenReturn(null);
        when(categorieVoitureDao.save(any(CategorieVoiture.class))).thenReturn(categorieVoiture);
        int result = categorieVoitureServiceImpl.save(categorieVoiture);
        assertEquals(1, result);
    }

    @Test
    public void testSave_ExceptionHandling() {
        when(categorieVoitureDao.save(any(CategorieVoiture.class))).thenThrow(new RuntimeException("Database error"));
        int result = categorieVoitureServiceImpl.save(categorieVoiture);
        assertEquals(-4, result);
    }

    @Test
    public void testUpdate_CategorieVoitureNotFound() {
        when(categorieVoitureDao.findByLibelle(anyString())).thenReturn(null);
        int result = categorieVoitureServiceImpl.update("SUV", "Luxury SUV");
        assertEquals(-2, result);
    }

    @Test
    public void testUpdate_Success() {
        when(categorieVoitureDao.findByLibelle(anyString())).thenReturn(categorieVoiture);
        when(categorieVoitureDao.save(any(CategorieVoiture.class))).thenReturn(categorieVoiture);
        int result = categorieVoitureServiceImpl.update("SUV", "Luxury SUV");
        assertEquals(1, result);
    }

    @Test
    public void testFindByLibelle() {
        when(categorieVoitureDao.findByLibelle(anyString())).thenReturn(categorieVoiture);
        CategorieVoiture result = categorieVoitureServiceImpl.findByLibelle("SUV");
        assertEquals(categorieVoiture, result);
    }

    @Test
    public void testFindAll() {
        List<CategorieVoiture> categorieVoitures = List.of(categorieVoiture);
        when(categorieVoitureDao.findAll()).thenReturn(categorieVoitures);
        List<CategorieVoiture> result = categorieVoitureServiceImpl.findAll();
        assertEquals(categorieVoitures, result);
    }

    @Test
    public void testDeleteByLibelle() {
        when(categorieVoitureDao.deleteByLibelle(anyString())).thenReturn(1);
        int result = categorieVoitureServiceImpl.deleteByLibelle("SUV");
        assertEquals(1, result);
    }
}

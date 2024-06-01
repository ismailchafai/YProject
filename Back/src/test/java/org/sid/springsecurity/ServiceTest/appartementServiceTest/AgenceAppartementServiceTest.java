package org.sid.springsecurity.ServiceTest.appartementServiceTest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.sid.springsecurity.bean.appartementBean.AgenceAppartement;
import org.sid.springsecurity.dao.appartementDao.AgenceAppartementDao;
import org.sid.springsecurity.security.bean.AppRole;
import org.sid.springsecurity.security.dao.AppRoleDao;
import org.sid.springsecurity.service.impl.appartementServiceImpl.AgenceAppartementServiceImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AgenceAppartementServiceTest {

    @Mock
    private AgenceAppartementDao agenceAppartementDao;

    @Mock
    private AppRoleDao appRoleDao;

    @InjectMocks
    private AgenceAppartementServiceImpl agenceAppartementService;

    private AgenceAppartement agenceAppartement;

    @BeforeEach
    public void setUp() {
        agenceAppartement = new AgenceAppartement();
        agenceAppartement.setIceAgApp(123456L);
        // Initialize other properties as needed
    }

    @Test
    public void testSave_AgenceAppartementAlreadyExists() {
        when(agenceAppartementDao.findByIceAgApp(anyLong())).thenReturn(new AgenceAppartement());
        int result = agenceAppartementService.save(agenceAppartement);
        assertEquals(-2, result);
    }

    @Test
    public void testUpdate_AgenceAppartementNotFound() {
        when(agenceAppartementDao.findByIceAgApp(anyLong())).thenReturn(null);
        int result = agenceAppartementService.update(agenceAppartement);
        assertEquals(-3, result);
    }

    // Add more test cases for other methods as needed
}

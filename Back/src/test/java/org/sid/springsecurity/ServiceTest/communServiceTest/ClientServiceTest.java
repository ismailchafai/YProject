package org.sid.springsecurity.ServiceTest.communServiceTest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.sid.springsecurity.bean.communBean.Client;
import org.sid.springsecurity.bean.voitureBean.AgenceLocation;
import org.sid.springsecurity.dao.communDao.ClientDao;
import org.sid.springsecurity.service.facade.appartementService.AgenceAppartementService;
import org.sid.springsecurity.service.facade.voitureService.AgenceLocationService;
import org.sid.springsecurity.service.impl.communServiceImpl.ClientServiceImpl;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClientServiceTest {

    @Mock
    private ClientDao clientDao;

    @Mock
    private AgenceAppartementService agenceAppartementService;

    @Mock
    private AgenceLocationService agenceLocationService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private ClientServiceImpl clientService;

    private Client client;

    @BeforeEach
    public void setUp() {
        client = new Client();
        client.setCin("123456789");
        // Initialize other properties as needed
    }

    @Test
    public void testSave_ClientAlreadyExists() {
        when(clientDao.findByCin(anyString())).thenReturn(new Client());
        int result = clientService.save(client);
        assertEquals(-2, result);
    }


    @Test
    public void testUpdate_ClientNotFound() {
        when(clientDao.findByCin(anyString())).thenReturn(null);
        int result = clientService.update(client);
        assertEquals(-1, result);
    }

    // Add more test cases for other methods as needed
}

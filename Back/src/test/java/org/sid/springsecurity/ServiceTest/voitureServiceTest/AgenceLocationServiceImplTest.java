package org.sid.springsecurity.ServiceTest.voitureServiceTest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.sid.springsecurity.bean.voitureBean.AgenceLocation;
import org.sid.springsecurity.dao.voitureDao.AgenceLocationDao;
import org.sid.springsecurity.service.impl.voitureServiceImpl.AgenceLocationServiceImpl;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AgenceLocationServiceImplTest {

    @Mock
    private AgenceLocationDao agenceLocationDao;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AgenceLocationServiceImpl agenceLocationService;

    private AgenceLocation agenceLocation;

    @BeforeEach
    void setUp() {
        agenceLocation = new AgenceLocation();
        agenceLocation.setUsername("testUsername");
        // Initialiser d'autres propriétés si nécessaire
    }

    @Test
    void testFindByUsername() {
        when(agenceLocationDao.findByUsername(anyString())).thenReturn(agenceLocation);

        AgenceLocation result = agenceLocationService.findByUsername("testUsername");

        assertNotNull(result);
        assertEquals("testUsername", result.getUsername());
    }
}
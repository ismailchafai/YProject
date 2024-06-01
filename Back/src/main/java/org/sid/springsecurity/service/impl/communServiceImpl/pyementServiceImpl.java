package org.sid.springsecurity.service.impl.communServiceImpl;

import org.sid.springsecurity.bean.communBean.Pyement;
import org.sid.springsecurity.dao.communDao.PyementDao;
import org.sid.springsecurity.service.facade.communService.PyementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class pyementServiceImpl implements PyementService {

 @Autowired
    private PyementDao pyementDao;
    @Override
    public List<Pyement> findAll() {
        return pyementDao.findAll();
    }
    @Override
    public int save(Pyement pyement){
        pyementDao.save(pyement);
        return 1;
    }
}

package org.sid.springsecurity.service.impl.ChatServiceImpl;

import org.sid.springsecurity.bean.chatbean.Chat;
import org.sid.springsecurity.dao.chatDao.ChatDao;
import org.sid.springsecurity.service.facade.chatService.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ChatServiceImpl implements ChatService {
    @Autowired
    private ChatDao chatDao;
    @Override
    public List<Chat> findAllBySender(String sender) {
        return chatDao.findAllBySender(sender);
    }
    @Override
    public List<Chat> findAllByRecipient(String recipient) {
        return chatDao.findAllByRecipient(recipient);
    }
    @Override
    public List<Chat> findAllBySenderAndRecipient(String sender,String recipient) {
        return chatDao.findAllBySenderAndRecipient(sender , recipient);
    }
    @Override
    public List<Chat> findAll() {
        return chatDao.findAll();
    }



    @Override
    public int save(Chat chat){
        this.chatDao.save(chat);
        return 1;
    }
}
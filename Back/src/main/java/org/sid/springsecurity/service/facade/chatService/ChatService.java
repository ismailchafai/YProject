package org.sid.springsecurity.service.facade.chatService;

import org.sid.springsecurity.bean.chatbean.Chat;

import java.util.List;

public interface ChatService {
    List<Chat> findAllBySender(String sender);
    List<Chat> findAllByRecipient(String recipient);

    List<Chat> findAllBySenderAndRecipient(String sender, String recipient);

    List<Chat> findAll();

    int save(Chat chat);
}
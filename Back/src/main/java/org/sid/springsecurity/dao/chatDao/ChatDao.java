package org.sid.springsecurity.dao.chatDao;


import org.sid.springsecurity.bean.chatbean.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ChatDao extends JpaRepository<Chat,Long> {

    List<Chat> findAllByRecipient(String recipient);
    List<Chat> findAllBySender(String sender);
    List<Chat> findAllBySenderAndRecipient(String sender , String recipient);

}
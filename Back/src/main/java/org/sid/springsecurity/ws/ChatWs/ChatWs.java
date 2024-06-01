package org.sid.springsecurity.ws.ChatWs;

import org.sid.springsecurity.bean.chatbean.Chat;
import org.sid.springsecurity.dao.chatDao.ChatDao;
import org.sid.springsecurity.service.facade.chatService.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/chat/")

public class ChatWs {
    @Autowired
    private ChatService chatService;
    @Autowired
    private ChatConvertir convertir ;
    @GetMapping("sender/{sender}")
    public List<ChatDto> findAllBySender(@PathVariable String sender) {
        return convertir.toDto(chatService.findAllBySender(sender));
    }
    @GetMapping("")
    public List<ChatDto> findAll() {
        return convertir.toDto(chatService.findAll());
    }
    @GetMapping("/sender/{sender}/recipient/{recipient}")
    public List<ChatDto> findAllBySenderAndRecipient(@PathVariable  String sender,@PathVariable  String recipient) {
        return convertir.toDto(chatService.findAllBySenderAndRecipient(sender , recipient));
    }
    @GetMapping("recipient/{recipient}")
    public List<ChatDto> findAllByRecipient(@PathVariable  String recipient) {
        return convertir.toDto(chatService.findAllByRecipient(recipient));
    }
    @PostMapping
    public int save(@RequestBody Chat chat) {
        return chatService.save(chat);
    }
}
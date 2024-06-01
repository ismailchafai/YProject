package org.sid.springsecurity.ws.ChatWs;

import org.sid.springsecurity.bean.chatbean.Chat;
import org.sid.springsecurity.bean.notification.NotificationReservation;
import org.sid.springsecurity.ws.dto.NotificationReservationDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ChatConvertir {
    public Chat toBean(ChatDto dto) {
        if(dto==null){
            return  null;
        }
        else {
            Chat bean = new Chat();
            bean.setId(dto.getId());
            bean.setSender(dto.getSender());
            bean.setRecipient(dto.getRecipient());
            bean.setContent(dto.getContent());
            bean.setDate(dto.getDate());

            return bean;
        }
    }
    public ChatDto toDto(Chat bean) {
        if(bean==null){
            return  null;
        }
        else {
            ChatDto dto = new ChatDto();

            dto.setId(bean.getId());
            dto.setSender(bean.getSender());
            dto.setRecipient(bean.getRecipient());
            dto.setContent(bean.getContent());
            dto.setDate(bean.getDate());
            return dto;
        }
    }
    public List<Chat> toBean(List<ChatDto> dtos) {
        List<Chat> beans = new ArrayList<>();
        for (ChatDto dto : dtos) {
            beans.add(toBean(dto));
        }
        return beans;
    }
    public List<ChatDto> toDto(List<Chat> beans) {
        List<ChatDto> dtos = new ArrayList<>();
        for (Chat dto : beans) {
            dtos.add(toDto(dto));
        }
        return dtos;
    }
}

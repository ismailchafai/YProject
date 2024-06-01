package org.sid.springsecurity.bean.photo;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "image")
@Data
public class ImageModule {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String type;
    @Column(length = 50000000)
    private byte[] picByte;
    public ImageModule(String name, String type, byte[] picByte) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }
    public ImageModule() {

    }
}

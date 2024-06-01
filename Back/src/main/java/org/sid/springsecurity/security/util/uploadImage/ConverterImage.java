package org.sid.springsecurity.security.util.uploadImage;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
@Component
public class ConverterImage {

    @Autowired
    private Cloudinary cloudinary;

    public Set<String> uploadImages(MultipartFile[] multipartFiles) throws IOException {
        Set<String> fileUrls = new HashSet<>();
        for (MultipartFile file : multipartFiles) {
            String uuid = UUID.randomUUID().toString().substring(0, 8);
            String fileName = uuid + file.getOriginalFilename();
            Map<?, ?> params = ObjectUtils.asMap("public_id", fileName); // Optional parameters
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), params);
            String fileUrl = (String) uploadResult.get("secure_url");
            fileUrls.add(fileUrl);
        }
        return fileUrls;
    }


    public String uploadImage(MultipartFile file) throws IOException {
        String uuid = UUID.randomUUID().toString().substring(0, 8);
        String fileName = uuid + file.getOriginalFilename();
        Map<?, ?> params = ObjectUtils.asMap("public_id", fileName); // Optional parameters
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), params);
        String fileUrl = (String) uploadResult.get("secure_url");
        return fileUrl;
    }

}

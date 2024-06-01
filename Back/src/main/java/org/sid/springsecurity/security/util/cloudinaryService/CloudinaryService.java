package org.sid.springsecurity.security.util.cloudinaryService;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class CloudinaryService {

    @Value("${cloudinary.cloud_name}")
    private String cloudName;

    @Value("${cloudinary.api_key}")
    private String apiKey;

    @Value("${cloudinary.api_secret}")
    private String apiSecret;

    public Set<String> getAllImagesInFolder(String folderName) {
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret));

        Set<String> imageUrls = new HashSet<>();

        try {
            Map<String, String> result = cloudinary.search()
                    .expression("folder:" + folderName)
                    .maxResults(500)
                    .execute();

            Object resourcesObject = result.get("resources");
            if (resourcesObject instanceof List) {
                List<Map<String, Object>> resourcesList = (List<Map<String, Object>>) resourcesObject;
                for (Map<String, Object> resource : resourcesList) {
                    String secureUrl = (String) resource.get("secure_url");
                    if (secureUrl != null) {
                        imageUrls.add(secureUrl);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return imageUrls;
    }


    public String extractImageName(String imageUrl) {
        //https://res.cloudinary.com/dqz21ftp0/image/upload/v1716433188/categoriesAppartement/Appartement_en_Rez_de_Jardin_xdrd9e.jpg
        //atwli haka   Appartement_en_Rez_de_Jardin
        //hada tayw9f fe a5ire /
        int lastSlashIndex = imageUrl.lastIndexOf("/");

        // hada tayw9f fe a5ire "_"
        int lastUnderscoreIndex = imageUrl.lastIndexOf("_");

        // tanbdaw men index "/"+1  et le dernier "_" hada automatique mada5lch
        String imageNameWithExtension = imageUrl.substring(lastSlashIndex + 1, lastUnderscoreIndex);

        return imageNameWithExtension;
    }


}

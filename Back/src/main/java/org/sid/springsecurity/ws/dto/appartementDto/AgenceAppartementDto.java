package org.sid.springsecurity.ws.dto.appartementDto;

import org.sid.springsecurity.bean.photo.ImageModule;

import java.util.Set;

public class AgenceAppartementDto {
    private Long id;
    private Long iceAgApp;
    private String raisonSocialAg;
    private String numTele;
    private String email;
    private String adresse;
    private int numCompteBkAgApp;
    private Long ribAgenceApp;
    private Long RCAgApp ;
    private String username;
    private String password;


//    private ImageModule logo;
//
//    public ImageModule getLogo() {
//        return logo;
//    }
//
//    public void setLogo(ImageModule logo) {
//        this.logo = logo;
//    }


    private String images;

    public String getImagePaths() {
        return images;
    }

    public void setImagePaths(String imagePaths) {
        this.images = imagePaths;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIceAgApp() {
        return iceAgApp;
    }

    public void setIceAgApp(Long iceAgApp) {
        this.iceAgApp = iceAgApp;
    }

    public String getRaisonSocialAg() {
        return raisonSocialAg;
    }

    public void setRaisonSocialAg(String raisonSocialAg) {
        this.raisonSocialAg = raisonSocialAg;
    }

    public String getNumTele() {
        return numTele;
    }

    public void setNumTele(String numTele) {
        this.numTele = numTele;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public int getNumCompteBkAgApp() {
        return numCompteBkAgApp;
    }

    public void setNumCompteBkAgApp(int numCompteBkAgApp) {
        this.numCompteBkAgApp = numCompteBkAgApp;
    }

    public Long getRibAgenceApp() {
        return ribAgenceApp;
    }

    public void setRibAgenceApp(Long ribAgenceApp) {
        this.ribAgenceApp = ribAgenceApp;
    }

    public Long getRCAgApp() {
        return RCAgApp;
    }

    public void setRCAgApp(Long RCAgApp) {
        this.RCAgApp = RCAgApp;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

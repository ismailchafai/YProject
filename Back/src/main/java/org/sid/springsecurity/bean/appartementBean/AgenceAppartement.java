package org.sid.springsecurity.bean.appartementBean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.sid.springsecurity.bean.communBean.Client;
import org.sid.springsecurity.bean.communBean.Paiement;
import org.sid.springsecurity.bean.photo.ImageModule;
import org.sid.springsecurity.security.bean.AppRole;
import org.sid.springsecurity.security.bean.AppUser;

import javax.persistence.*;

import java.util.Collection;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "agenceAppartement")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AgenceAppartement extends AppUser {
    private Long iceAgApp;
    private String raisonSocialAg;
    private String numTele;
    private String email;
    private String adresse;
    private int numCompteBkAgApp;
    private Long ribAgenceApp;
    private Long RCAgApp ;


    public AgenceAppartement(String username, String password, Long iceAgApp, String raisonSocialAg, String numTele, String email, String adresse, int numCompteBkAgApp, Long ribAgenceApp, Long RCAgApp,String images) {
      this.setUsername(username);
      this.setPassword(password);
        this.iceAgApp = iceAgApp;
        this.raisonSocialAg = raisonSocialAg;
        this.numTele = numTele;
        this.email = email;
        this.adresse = adresse;
        this.numCompteBkAgApp = numCompteBkAgApp;
        this.ribAgenceApp = ribAgenceApp;
        this.RCAgApp = RCAgApp;
        this.images=images;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "agenceAppartement")
    private List<Client> clients;

    @JsonIgnore
    @OneToMany(mappedBy = "agenceAppartement")
    private List<Paiement> paiements;

    @JsonIgnore
    @OneToMany(mappedBy = "agenceAppartement",cascade = CascadeType.ALL)
    private List<Appartement> appartementList;


    private String images;

    public String getImagePaths() {
        return images;
    }

    public void setImagePaths(String imagePaths) {
        this.images = imagePaths;
    }



    public List<Appartement> getAppartementList() {
        return appartementList;
    }

    public void setAppartementList(List<Appartement> appartementList) {
        this.appartementList = appartementList;
    }

    public AgenceAppartement() {

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

    public List<Client> getClients() {
        return clients;
    }

    public void setClients(List<Client> clients) {
        this.clients = clients;
    }

    public List<Paiement> getPaiements() {
        return paiements;
    }

    public void setPaiements(List<Paiement> paiements) {
        this.paiements = paiements;
    }
}

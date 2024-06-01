package org.sid.springsecurity.ws.dto.appartementDto;

import org.sid.springsecurity.bean.photo.ImageModule;
import org.sid.springsecurity.ws.dto.communDto.ReservationDto;

import java.util.List;
import java.util.Set;

public class AppartementDto {
    private Long id;
    private String code;
    private int superficie;
    private String adresse;
    private double loyerMensuel;

    private String ville;
    private String wifi;
    private int nmbrPersont ;
    private String climatiseur;
    private List<ReservationDto> reservationDtos;
//    private Set<ImageModule>  images;

    private Set<String> images;

    public Set<String> getImagePaths() {
        return images;
    }

    public void setImagePaths(Set<String> imagePaths) {
        this.images = imagePaths;
    }



    private CategoriesAppartementDto categoriesAppartementDto;
    private AgenceAppartementDto agenceAppartementDto;

    public List<ReservationDto> getReservationDtos() {
        return reservationDtos;
    }



//    public Set<ImageModule> getImages() {
//        return images;
//    }
//
//    public void setImages(Set<ImageModule> images) {
//        this.images = images;
//    }



    public void setReservationDtos(List<ReservationDto> reservationDtos) {
        this.reservationDtos = reservationDtos;
    }



    public AgenceAppartementDto getPropAppartemenetDto() {
        return agenceAppartementDto;
    }

    public void setPropAppartemenetDto(AgenceAppartementDto agenceAppartementDto) {
        this.agenceAppartementDto = agenceAppartementDto;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getSuperficie() {
        return superficie;
    }

    public void setSuperficie(int superficie) {
        this.superficie = superficie;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public double getLoyerMensuel() {
        return loyerMensuel;
    }

    public void setLoyerMensuel(double loyerMensuel) {
        this.loyerMensuel = loyerMensuel;
    }


    public CategoriesAppartementDto getCategoriesAppartementDto() {
        return categoriesAppartementDto;
    }

    public void setCategoriesAppartementDto(CategoriesAppartementDto categoriesAppartementDto) {
        this.categoriesAppartementDto = categoriesAppartementDto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getWifi() {
        return wifi;
    }

    public void setWifi(String wifi) {
        this.wifi = wifi;
    }

    public int getNmbrPersont() {
        return nmbrPersont;
    }

    public void setNmbrPersont(int nmbrPersont) {
        this.nmbrPersont = nmbrPersont;
    }

    public String getClimatiseur() {
        return climatiseur;
    }

    public void setClimatiseur(String climatiseur) {
        this.climatiseur = climatiseur;
    }
}

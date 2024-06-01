package org.sid.springsecurity;

import org.apache.catalina.LifecycleState;
import org.sid.springsecurity.bean.communBean.*;
import org.sid.springsecurity.bean.notification.NotificationReservation;
import org.sid.springsecurity.bean.appartementBean.Appartement;
import org.sid.springsecurity.bean.appartementBean.CategoriesAppartement;
import org.sid.springsecurity.bean.appartementBean.AgenceAppartement;
import org.sid.springsecurity.bean.voitureBean.AgenceLocation;
import org.sid.springsecurity.bean.voitureBean.CategorieVoiture;
import org.sid.springsecurity.bean.voitureBean.Voiture;
import org.sid.springsecurity.security.bean.AppRole;
import org.sid.springsecurity.security.bean.AppUser;
import org.sid.springsecurity.security.service.AccountService;
import org.sid.springsecurity.security.util.cloudinaryService.CloudinaryService;
import org.sid.springsecurity.security.util.constantApp.ConstantApp;
import org.sid.springsecurity.service.facade.NotifiactionReservationService;
import org.sid.springsecurity.service.facade.appartementService.AppartementService;
import org.sid.springsecurity.service.facade.appartementService.CategoriesAppartementService;
import org.sid.springsecurity.service.facade.appartementService.AgenceAppartementService;
import org.sid.springsecurity.service.facade.communService.*;
import org.sid.springsecurity.service.facade.voitureService.AgenceLocationService;
import org.sid.springsecurity.service.facade.voitureService.CategorieVoitureService;
import org.sid.springsecurity.service.facade.voitureService.VoitureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@SpringBootApplication
public class SafarentApplication {

    public static void main(String[] args) {
        SpringApplication.run(SafarentApplication.class, args);
    }

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private ConstantApp constantApp;

    @Bean
    PasswordEncoder passwordEncoder(){
        return  new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner start(AccountService accountService,
                            CategoriesAppartementService categoriesAppartementService,
                            CategorieVoitureService categorieVoitureService,
                            AgenceAppartementService agenceAppartementService,
                            AgenceLocationService agenceLocationService,
                            ClientService clientService,
                            NotifiactionReservationService notifiactionReservationService,
                            AppartementService appartementService,
                            ReservationService reserVationService,
                            LocationService locationService,
                            PaiementService paiementService,
                            FactureService factureService,
                            ContratService contratService,
                            VoitureService voitureService
    ){
        return args -> {



            Set<String> categoriesImagesAppartemet = cloudinaryService.getAllImagesInFolder("categoriesAppartement");
            List<CategoriesAppartement> categoriesAppartements=new ArrayList<>();

            Set<String> categoriesImagesVoiture=cloudinaryService.getAllImagesInFolder("categorieVoit");
            List<CategorieVoiture> categoriesVoitures=new ArrayList<>();

            Set<String> logs=cloudinaryService.getAllImagesInFolder("logo");


            List<Appartement> appartements=new ArrayList<>();


            accountService.addNewRole(new AppRole(null, "ADMIN"));
            accountService.addNewRole(new AppRole(null, "MANAGER-APT"));
            accountService.addNewRole(new AppRole(null, "MANAGER-VOI"));
            accountService.addNewRole(new AppRole(null, "USER"));

            accountService.addNewUser(new AppUser(null, "admin", "admin", new ArrayList<>()));


            accountService.addRoleToUser("admin", "ADMIN");
            accountService.addRoleToUser("admin", "MANAGER-APT");
            accountService.addRoleToUser("admin", "MANAGER-VOI");
            accountService.addRoleToUser("admin", "USER");



            String[] CATEGORIES = {
                    "Appartement de Charme",
                    "Appartement Loft",
                    "Studio",
                    "Appartement en Rez de Jardin",
                    "Appartement Triplex",
                    "Appartement Économique",



                        "Appartement 1 Chambre",
                        "Appartement 2 Chambres",
                        "Appartement 3 Chambres",
                        "Appartement 4 Chambres et Plus",
                        "Appartement de Luxe",
                        "Appartement Meublé",
                        "Appartement Non Meublé",
                        "Appartement avec Balcon Terrasse",
                        "Appartement Rez de Chaussée",

                        "Appartement avec Vue",
                        "Appartement de Vacances",
                        "Appartement Duplex",
                        "Appartement Penthouse"
                };






            for (String c : categoriesImagesAppartemet) {
                String libelle = cloudinaryService.extractImageName(c);
                CategoriesAppartement categorie = new CategoriesAppartement(libelle, c);
                categoriesAppartements.add(categorie);
                categoriesAppartementService.save(categorie);
            }


            for (String v : categoriesImagesVoiture) {
                String libelle = cloudinaryService.extractImageName(v);
                CategorieVoiture categorie = new CategorieVoiture(libelle, v);
                categoriesVoitures.add(categorie);
              int reselt=  categorieVoitureService.save(categorie);
            }


            AgenceAppartement agenceAppartement1 = new AgenceAppartement("mohammed.p", "123", 123456789L, "ImmoGestion SA", "+1234567890", "contact@immogestion.com", "10 Rue des Appartements", 987654321, 1234567890123456789L, 987654321L,ConstantApp.logoAppartemet);
            AgenceAppartement agenceAppartement2 = new AgenceAppartement("ismail.p", "123", 987654321L, "City Apartments Agency", "+9876543210", "info@cityapartments.com", "20 Avenue des Résidences", 1230987654, 1468013579246801357L, 123456789L,ConstantApp.logoAppartemet);
            AgenceAppartement agenceAppartement3 = new AgenceAppartement("abdelilah.p", "123", 246810975L, "Sunset Realty Services", "+1122334455", "info@sunsetrealty.com", "30 Boulevard du Soleil", 1357924680, 2468013579246801357L, 987654321L,ConstantApp.logoAppartemet);
            AgenceAppartement agenceAppartement4 = new AgenceAppartement("abderrahmane.p", "123", 555555555L, "Prime Properties Group", "+9999999999", "contact@primeproperties.com", "40 Place du Luxe", 444444444, 5555555555444444444L, 111111111L,ConstantApp.logoAppartemet);

            agenceAppartementService.save(agenceAppartement1);
            agenceAppartementService.save(agenceAppartement2);
            agenceAppartementService.save(agenceAppartement3);
            agenceAppartementService.save(agenceAppartement4);


            AgenceLocation agenceLocation1 = new AgenceLocation(
                    "mohammed.a",
                    "123",
                    12345L,
                    "Agence XYZ",
                    "123 Main Street",
                    "123-456-7890",
                    987654321,
                    123456789012L,
                    987654L,
                    ConstantApp.logoAgence
            );


            AgenceLocation agenceLocation2 = new AgenceLocation(
                    "ismail.a",
                    "123",
                    12346L,
                    "Agence XYZ",
                    "123 Main Street",
                    "123-456-7890",
                    987654321,
                    123456789012L,
                    987654L,
                    ConstantApp.logoAgence
            );

            AgenceLocation agenceLocation3 = new AgenceLocation(
                    "abdelilah.a",
                    "123",
                    12347L,
                    "Agence XYZ",
                    "123 Main Street",
                    "123-456-7890",
                    987654321,
                    123456789012L,
                    987654L,
                    ConstantApp.logoAgence
            );

            AgenceLocation agenceLocation4 = new AgenceLocation(
                    "abderrahmane.a",
                    "123",
                    12348L,
                    "Agence XYZ",
                    "123 Main Street",
                    "123-456-7890",
                    987654321,
                    123456789012L,
                    987654L,
                    ConstantApp.logoAgence
            );
            agenceLocationService.save(agenceLocation1);
            agenceLocationService.save(agenceLocation2);
            agenceLocationService.save(agenceLocation3);
            agenceLocationService.save(agenceLocation4);

            String sir =
                    "\u001B[32m" +
                            "  ____                 _    \n" +
                            " / ___| ___   ___   __| | ___ \n" +
                            "| |  _ / _ \\ / _ \\ / _` |/ _ \\\n" +
                            "| |_| | (_) | (_) | (_| |  __/\n" +
                            " \\____|\\___/ \\___/ \\__,_|\\___|\n" +
                            "\u001B[0m";

            System.out.println(sir);




            System.out.print("\u001B[32mLoading\u001B[0m");
            for(int i=0;i<categoriesAppartements.size()/2;i++){
                System.out.print("\u001B[32m.\u001B[0m");
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                for(int j=1;j<=3;j++){
//                    Random random=new Random();
//                    int index=random.nextInt(10)+1;
//                    Set<String> images = cloudinaryService.getAllImagesInFolder("appartemet"+index);
                    Set<String> images = cloudinaryService.getAllImagesInFolder("appartemet"+j);
                    Appartement appartement = new Appartement();
                    appartement.setSuperficie((int) (Math.random() * 1000));
                    appartement.setAdresse("Rue salame " + ConstantApp.VILLES_MAROC.get(j));
                    appartement.setVille(ConstantApp.VILLES_MAROC.get(0));
                    appartement.setWifi("Oui");
                    appartement.setNmbrPersont(ConstantApp.generateRandomNumberOfPersons(1, 10));
                    appartement.setClimatiseur(ConstantApp.getRandomYesNo());
                    appartement.setLoyerMensuel(ConstantApp.generateRandomRent(299.99, 1999.99));
                    appartement.setCategoriesAppartement(categoriesAppartements.get(i));
                    appartement.setAgenceAppartement(agenceAppartement1);
                    appartement.setImages(images);
                    appartement.setReservation(null);
                    appartementService.save(appartement);
                }
            }
            for(int i=0;i<categoriesVoitures.size()/2;i++){
                System.out.print("\u001B[32m.\u001B[0m");
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                for(int j=1;j<=4;j++){
                    Set<String> images = cloudinaryService.getAllImagesInFolder("voiture"+j);
                    Voiture voiture=new Voiture();
                    voiture.setCouleur("Black");
                    voiture.setNbrPlace(ConstantApp.generateRandomNumberOfPersons(1, 6));
                    voiture.setMatricule(UUID.randomUUID().toString().substring(0,6));
                    voiture.setKiloMetrage(i+100);
                    voiture.setBoitevitesse(ConstantApp.getRandomBoitevitesse());
                    voiture.setAnnee(new Date());
                    voiture.setVille(ConstantApp.VILLES_MAROC.get(i));
                    voiture.setDateAssurance(new Date());
                    voiture.setSateVisitetechnique(new Date());
                    voiture.setCategorieVoiture(categoriesVoitures.get(i));
                    voiture.setAgenceLocation(agenceLocation1);
                    voiture.setImagePaths(images);
                    voiture.setPrix(200);
                    voitureService.save(voiture);
                }
            }



            Client client1 = new Client(
                    "mohammed.c",
                    "123",
                    "EE43434",
                    "John",
                    "Doe",
                    "123-456-7890",
                    "john@example.com");

            Client client2 = new Client(
                    "ismail.c",
                    "123",
                    "EE09090",
                    "John",
                    "Doe",
                    "123-456-7890",
                    "john@example.com");
            Client client3 = new Client(
                    "abdelilah.c",
                    "123",
                    "CC52525",
                    "John",
                    "Doe",
                    "123-456-7890",
                    "john@example.com");
            Client client4 = new Client(
                    "abderrahmane.c",
                    "123",
                    "CC09090",
                    "John",
                    "Doe",
                    "123-456-7890",
                    "john@example.com");

            clientService.save(client1);
            clientService.save(client2);
            clientService.save(client3);
            clientService.save(client4);
//**********************************************************************************************
            clientService.save(client1);
            clientService.save(client2);
            clientService.save(client3);
            clientService.save(client4);


            System.out.println();
            System.out.println("\u001B[32mSuccessful\u001B[0m");
            System.out.println("\u001B[32m#####################################################################################################################\u001B[0m");
            System.out.println("\u001B[32mAlert de server !\u001B[0m");
        };}}

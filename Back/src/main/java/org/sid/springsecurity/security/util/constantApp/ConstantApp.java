package org.sid.springsecurity.security.util.constantApp;

import org.sid.springsecurity.bean.appartementBean.Appartement;
import org.sid.springsecurity.bean.appartementBean.CategoriesAppartement;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Random;

@Component
public class ConstantApp {


 public  static Random random = new Random();
    // Liste des villes du Maroc
    public static final List<String> VILLES_MAROC = Arrays.asList(
            "Agadir",
            "Al Hoceïma",
            "Asilah",
            "Azrou",
            "Beni Mellal",
            "Berkane",
            "Berrechid",
            "Casablanca",
            "Chefchaouen",
            "Dakhla",
            "El Jadida",
            "Errachidia",
            "Essaouira",
            "Fès",
            "Figuig",
            "Guelmim",
            "Ifrane",
            "Kénitra",
            "Khouribga",
            "Laâyoune",
            "Larache",
            "Marrakech",
            "Meknès",
            "Mohammedia",
            "Nador",
            "Ouarzazate",
            "Ouezzane",
            "Oujda",
            "Rabat",
            "Safi",
            "Salé",
            "Tanger",
            "Taza",
            "Témara",
            "Tétouan",
            "Tiznit"
    );


    public  final  static String logoAppartemet="https://res.cloudinary.com/dei3y0lpx/image/upload/v1716472274/logo/loogo_appartemet_vldyu9.jpg";
    public  final  static String logoAgence="https://res.cloudinary.com/dei3y0lpx/image/upload/v1716472273/logo/logo_voiture_uxqgcg.png";


    public static int generateRandomNumberOfPersons(int minPersons, int maxPersons) {

        if (minPersons < 1) {
            throw new IllegalArgumentException("Le nombre minimum de personnes doit être au moins 1.");
        }

        if (maxPersons < minPersons) {
            throw new IllegalArgumentException("Le nombre maximum de personnes doit être supérieur ou égal au nombre minimum de personnes.");
        }

        Random random = new Random();
        return random.nextInt(maxPersons - minPersons + 1) + minPersons;
    }



    public static String getRandomYesNo() {
        int randomNumber = random.nextInt(2);
        return randomNumber == 0 ? "oui" : "non";
    }

    public static String getRandomBoitevitesse() {
        int randomNumber = random.nextInt(2);
        return randomNumber == 0 ? "Automatique" : "Manuelle";
    }




    public static double generateRandomRent(double minRent, double maxRent) {
        if (minRent < 0) {
            throw new IllegalArgumentException("Le loyer minimum ne peut pas être négatif.");
        }

        if (maxRent < minRent) {
            throw new IllegalArgumentException("Le loyer maximum doit être supérieur ou égal au loyer minimum.");
        }

        double rent = random.nextDouble() * (maxRent - minRent) + minRent;

        String formattedRent = String.format(Locale.US, "%.2f", rent);

        return Double.parseDouble(formattedRent);
    }









}

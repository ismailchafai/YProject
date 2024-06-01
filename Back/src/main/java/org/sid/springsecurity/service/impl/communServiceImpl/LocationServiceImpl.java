package org.sid.springsecurity.service.impl.communServiceImpl;

import org.sid.springsecurity.bean.communBean.Contrat;
import org.sid.springsecurity.bean.communBean.Facture;
import org.sid.springsecurity.bean.communBean.Location;
import org.sid.springsecurity.bean.communBean.Reservation;
import org.sid.springsecurity.dao.communDao.LocationDao;
import org.sid.springsecurity.service.facade.communService.ContratService;
import org.sid.springsecurity.service.facade.communService.FactureService;
import org.sid.springsecurity.service.facade.communService.LocationService;
import org.sid.springsecurity.service.facade.communService.ReservationService;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class LocationServiceImpl implements LocationService {
    private LocationDao locationDao ;
    private FactureService factureService ;
    private ContratService contratService ;
    private ReservationService reservationService;



    public LocationServiceImpl( LocationDao locationDao,@Lazy FactureService factureService,@Lazy ContratService contratService,@Lazy ReservationService reservationService) {
        this.locationDao = locationDao;
        this.factureService = factureService;
        this.contratService = contratService;
        this.reservationService = reservationService;
    }


    @Override
    public int save(Location location) {
        if (location == null) {
            System.out.println("location null");
            return -1;
        }
        if (findByRef(location.getRef()) != null) {
            System.out.println("location (ref) deja existed");
            return -2;
        }
        String ref = location.getReservation().getRef();
        Reservation reservation = reservationService.findByRef(ref);
        if(location.getReservation()==null){
            return -3;
        }
        if (reservation == null) {
            System.out.println("reservation est null");
            return -4;
        }
        if (reservationService.findByRef(reservation.getRef())  == null) {
            System.out.println("Cette reservation (ref) n'existe pas");
            return -5;
        }
        location.setReservation(reservation);
        locationDao.save(location);
        Facture facture =new Facture();
        facture.setLocation(location);
        Random random = new Random();
        int randomIncrement = random.nextInt(10);
        facture.setRef(String.valueOf(randomIncrement) );
        facture.setDateFacture(LocalDateTime.now());
        factureService.save(facture);
        return 1;
    }

    @Override
    public List<Location> findAll() {
        return locationDao.findAll();
    }


//    @Override
//    public List<Location> findAllByAgenceLocationUsername(String username) {
//
//        List<Location> allLocations = locationDao.findAll();
//
//        List<Location> filteredLocations = allLocations.stream()
//                .filter(location -> location..equals(username))
//                .collect(Collectors.toList());
//
//        return filteredLocations;
//    }

    @Override
    public Location findByRef(String ref) {
        return locationDao.findByRef(ref);
    }

    @Override
    public Map<Integer, Long> countLocationsByMonth() {
        List<Location> locations = locationDao.findAll();
        Map<Integer, Long> countByMonth = new HashMap<>();

        for (Location location : locations) {
            int month = location.getDateDebut().getMonthValue();
            countByMonth.put(month, countByMonth.getOrDefault(month, 0L) + 1);
        }

        return countByMonth;
    }


    @Override
    public Map<Integer, Long> countLocationsByMonth(String username) {
        List<Location> locations = locationDao.findAll();
        Map<Integer, Long> countByMonth = new HashMap<>();

        for (Location location : locations) {
            int month = location.getDateDebut().getMonthValue();
            countByMonth.put(month, countByMonth.getOrDefault(month, 0L) + 1);
        }

        return countByMonth;
    }
    @Transactional
    @Override
    public int deleteByRef(String ref) {
        return locationDao.deleteByRef(ref);
    }


    @Override
    public int update(Location location) {
        Location existingLocation = findByRef(location.getRef());

        if (existingLocation == null) {
            return -1;
        }

        try {
            if (location.getReservation() == null) {
                return -2;
            }
            if (location.getReservation().getRef() == null) {
                return -3;
            }
            Reservation reservation = reservationService.findByRef(location.getReservation().getRef());
            if (location.getFacture() != null) {
                Facture facture = factureService.findByRef(location.getFacture().getRef());
                location.setFacture(facture);
            } else {
                location.setFacture(null);
            }
            if (location.getContrat() != null) {
                Contrat contrat = contratService.findByNumContrat(location.getContrat().getNumContrat());
                location.setContrat(contrat);
            } else {
                location.setFacture(null);
            }

            existingLocation.setReservation(reservation);
            existingLocation.setDatefine(location.getDatefine());
            existingLocation.setDateDebut(location.getDateDebut());

            locationDao.save(existingLocation);
            return 1;
        } catch (Exception e) {
            System.err.println("Erreur lors de la mise à jour de la location : " + e.getMessage());
            e.printStackTrace();
            return -4;
        }
    }
    @Override
    public Location findLocationByReservationRef(String ref) {
        return locationDao.findLocationByReservationRef(ref);
    }
}




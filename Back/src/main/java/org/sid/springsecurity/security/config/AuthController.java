package org.sid.springsecurity.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;


    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/profile")
    public  Authentication authentication(Authentication authentication){
        return authentication;
    }

    @PostMapping("/login")
    public void login(@RequestParam String username, @RequestParam String password) {

        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username,passwordEncoder.encode(password)));
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            System.out.println(userDetails.getUsername());
            System.out.println(userDetails.getPassword());
        }catch (Exception ignored){
            System.out.println("error!!");
        }


    }

}

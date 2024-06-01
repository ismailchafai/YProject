package org.sid.springsecurity.security.config;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import jdk.jshell.Snippet;
import org.sid.springsecurity.security.bean.AppUser;
import org.sid.springsecurity.security.filter.JwtAuthenticationFilter;
import org.sid.springsecurity.security.filter.JwtAuthorisationFilter;
import org.sid.springsecurity.security.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.spec.SecretKeySpec;
import java.util.ArrayList;
import java.util.Collection;

@Configuration
@EnableWebSecurity
public class Config extends WebSecurityConfigurerAdapter {
    @Autowired
    private AccountService accountService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .headers().frameOptions().disable()
                .and()
                .authorizeRequests()


                .antMatchers(HttpMethod.POST, "/api/notification/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/notification/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/notification/**").permitAll()

                .antMatchers(HttpMethod.POST, "/api/paiement/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/paiement/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/paiement/**").permitAll()

                .antMatchers(HttpMethod.POST, "/api/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/**").permitAll()


                .antMatchers(
                        HttpMethod.GET,
                        "/api/categoriesAppartemen/public",
                        "/api/appartement/public",
                        "/api/safarent/manager/categorieVoiture/public",
                        "/api/safarent/manager/voiture/public",
                        "/api/appartement/listAppartementCategories/**",
                        "/api/safarent/manager/reservation/reservationByAppartement/code/**",
                        "/api/safarent/manager/reservation/reservationByVoiture/matricule/**",
                        "/api/appartement/code/**",

                        "/api/safarent/manager/reservation/**",
                        "/api/appartement/public/code/**",
                        "/api/appartement/public/**",
                        "/api/safarent/manager/voiture/public/**",
                        "/api/safarent/manager/reservation/reservationByAppartement/public/code/**",
                        "/api/safarent/manager/reservation/reservationByVoiture/public/matricule/**",

                        "/user",
                        "/api/client/**",
                        "/api/notification/**",
                        "/api/agenceLocation/**",
                        "/api/agenceAppartement/**",
                        "/refreshToken/",
                        "/login/",
                        "/user/"
                ).permitAll()
                .antMatchers(HttpMethod.POST, "/api/paiement/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/paiement/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/paiement/**").permitAll()

                .antMatchers(HttpMethod.POST, "/api/client/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/client/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/client/**").permitAll()

                .antMatchers(HttpMethod.POST, "/api/agenceLocation/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/agenceLocation/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/agenceLocation/**").permitAll()

                .antMatchers(HttpMethod.POST, "/api/safarent/manager/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/safarent/manager/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/safarent/manager/**").permitAll()

                .antMatchers(HttpMethod.POST, "/api/agenceAppartement/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/agenceAppartement/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/agenceAppartement/**").permitAll()


                .antMatchers(HttpMethod.POST, "/api/paiement/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/paiement/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/paiement/**").permitAll()




                .antMatchers(HttpMethod.POST, "/api/facture/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/facture/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/facture/**").permitAll()


                .antMatchers( "/refreshToken/", "/login/", "/user/").permitAll()
//                .antMatchers(HttpMethod.GET, "/api/appartement/listAppartementCategories/{category}").permitAll()
//                .antMatchers(HttpMethod.GET, "/api/safarent/manager/voiture/CategorieVoitureLibelle/{libelle}").permitAll()
//                .antMatchers(HttpMethod.GET, "/api/safarent/manager/reservation/reservationByVoiture/matricule/{matricule}").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManagerBean()))
                .addFilterBefore(new JwtAuthorisationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .csrf().disable()
//                .cors(Customizer.withDefaults())
//                .authorizeRequests(requests ->
//                        requests.antMatchers("/h2-console/**", "/refreshToken/", "/login/", "/user/").permitAll()
//                                .anyRequest().authenticated() // Require authentication for all other requests
//                )
//                .oauth2ResourceServer(oa -> oa.jwt(jwt -> jwt.decoder(jwtDecoder())))
//                .addFilter(new JwtAuthenticationFilter(authenticationManagerBean()))
//                .addFilterBefore(new JwtAuthorisationFilter(), UsernamePasswordAuthenticationFilter.class);
//    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:4200");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        String secretKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return new NimbusJwtEncoder(new ImmutableSecret<>(secretKey.getBytes()));
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        String secretKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecretKeySpec sec = new SecretKeySpec(secretKey.getBytes(), "RSA");
        return NimbusJwtDecoder.withSecretKey(sec).macAlgorithm(MacAlgorithm.HS256).build();
    }


    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                AppUser appUser = accountService.loadUserByUsername(username);
                if(appUser==null){
                    throw new UsernameNotFoundException("User not found with username: " + username);
                }
                else {
                    Collection<GrantedAuthority> authorities = new ArrayList<>();
                    appUser.getAppRoles().forEach(r -> {
                        authorities.add(new SimpleGrantedAuthority(r.getRoleName()));
                    });
                    return new User(appUser.getUsername(), appUser.getPassword(), authorities);
                }
            }
        });
    }
}

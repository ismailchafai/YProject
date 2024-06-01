package org.sid.springsecurity.security.ws;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.sid.springsecurity.security.bean.AppRole;
import org.sid.springsecurity.security.bean.AppUser;
import org.sid.springsecurity.security.service.AccountService;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class AccountRestController {
    @CrossOrigin("*")
    @PostMapping("/user")
    public AppUser addNewUser(@RequestBody AppUser appUser) {
        return accountService.addNewUser(appUser);
    }

    @PostAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("/role")
    public AppRole addNewRole(@RequestBody AppRole appRole) {
        return accountService.addNewRole(appRole);
    }

    @PostAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("/addRoleToUser")
    public void addRoleToUser(@RequestBody RoleUserForm roleUserForm) {
        accountService.addRoleToUser(roleUserForm.getUsername(), roleUserForm.getRoleName());
    }

    public AppUser loadUserByUsername(String username) {
        return accountService.loadUserByUsername(username);
    }

    @GetMapping("/user")
    @PostAuthorize("hasAnyAuthority('ADMIN')")
    public List<AppUser> listUsers() {
        return accountService.listUsers();
    }

    private final AccountService accountService;

    public AccountRestController(AccountService accountService) {
        this.accountService = accountService;
    }


    @GetMapping("/refreshToken/")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authenticationToken = request.getHeader("Authorization");
        if (authenticationToken != null && authenticationToken.startsWith("Bearer")) {
            try {
                String jwt = authenticationToken.substring(7);
                Algorithm algorithm = Algorithm.HMAC256("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
                JWTVerifier jwtVerifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = jwtVerifier.verify(jwt);
                String username = decodedJWT.getSubject();

                AppUser appUser = accountService.loadUserByUsername(username);

                String jwtAccessToken = JWT.create()
                        .withSubject(appUser.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("scope", appUser.getAppRoles().stream().map(AppRole::getRoleName).collect(Collectors.toList()))
                        .sign(algorithm);

                Map<String, String> tokenMap = new HashMap<>();
                tokenMap.put("refreshToken", jwt);
                tokenMap.put("newAccessToken", jwtAccessToken);

                // Convertir le map en JSON
                ObjectMapper objectMapper = new ObjectMapper();
                String tokensJson = objectMapper.writeValueAsString(tokenMap);

                // Envoyer les tokens dans le corps de la réponse
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(tokensJson);

            } catch (Exception ex) {
                throw ex;
            }

        } else {
            throw new RuntimeException("Refresh token required!!");
        }
    }

}
@Data
class RoleUserForm{
    private String username;
    private String roleName;
}

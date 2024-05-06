package com.itma.speciassist.config;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.itma.speciassist.dto.UserDto;
import com.itma.speciassist.model.Role;
import com.itma.speciassist.model.User;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

    private String secretKey;

    @org.springframework.beans.factory.annotation.Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKeyProperty;
 @PostConstruct
    protected void init() {
        // Utilisation de Base64 pour encoder la clé secrète
        secretKey = Base64.getEncoder().encodeToString(secretKeyProperty.getBytes());
    }

    // Méthode pour créer un token JWT
    public String createToken(User dto) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3_600_000); // 1 heure de validité

        return JWT.create()
                .withIssuer(dto.getUsername())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withClaim("nom", dto.getNom())
                .withClaim("prenom", dto.getPrenom())
                .withClaim("role", dto.getRole().toString()) // Ajouter le rôle de l'utilisateur
                .sign(Algorithm.HMAC256(secretKey));
    }

    // Méthode pour valider le token JWT et récupérer l'objet Authentication
    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decoded = verifier.verify(token);

        String roleString = decoded.getClaim("role").asString();
        Role role;
        try {
            role = Role.valueOf(roleString);
        } catch (IllegalArgumentException e) {
            // Gérer le cas où la chaîne ne correspond pas à une valeur valide de l'énumération
            // Par exemple, attribuer une valeur par défaut ou lancer une exception appropriée
            role = Role.USER; // Utilisation d'une valeur par défaut
        }
        UserDto user = UserDto.builder()
                .username(decoded.getIssuer())
                .nom(decoded.getClaim("nom").asString())
                .prenom(decoded.getClaim("prenom").asString())
                .role(role)
                .build();
        // Création d'un objet Authentication à partir des informations de l'utilisateur
        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }
}

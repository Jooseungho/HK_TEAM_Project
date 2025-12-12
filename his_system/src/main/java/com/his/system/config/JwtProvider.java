package com.his.system.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider {

    private final Key key;

    public JwtProvider() {
        this.key = Keys.hmacShaKeyFor("my-super-secret-key-for-his-system".getBytes());
    }

    public String createToken(String employeeNo, String role) {
        long expiration = 1000L * 60 * 60 * 24; // 24시간

        return Jwts.builder()
                .setSubject(employeeNo.toString())
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)
                .compact();
    }

    public Long getUserId(String token) {
        return Long.valueOf(
                Jwts.parserBuilder().setSigningKey(key).build()
                        .parseClaimsJws(token)
                        .getBody().getSubject()
        );
    }

    public String getRole(String token) {
        return (String)
                Jwts.parserBuilder().setSigningKey(key).build()
                        .parseClaimsJws(token)
                        .getBody().get("role");
    }
}

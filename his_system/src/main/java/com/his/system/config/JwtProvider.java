package com.his.system.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider {

    private final Key key;

    // 🔐 JWT 서명 키 (application.properties의 secret과 동일해야 함)
    public JwtProvider() {
        this.key = Keys.hmacShaKeyFor(
                "my-super-secret-key-for-his-system".getBytes()
        );
    }

    // ✅ 토큰 생성
    public String createToken(String employeeNo, String role) {
        long expiration = 1000L * 60 * 60 * 24; // 24시간

        return Jwts.builder()
                .setSubject(employeeNo)           // ⭐ employeeNo를 그대로 subject에 저장
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)
                .compact();
    }

    // ✅ employeeNo 추출 (로그아웃 로그용)
    public String getEmployeeNo(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // ✅ role 추출 (권한 체크용)
    public String getRole(String token) {
        return (String) Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role");
    }
}

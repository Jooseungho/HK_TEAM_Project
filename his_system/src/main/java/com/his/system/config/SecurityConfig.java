package com.his.system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable());
        http.formLogin(form -> form.disable());
        http.httpBasic(basic -> basic.disable());

        // ⭐ Spring Security 7.x 최신 문법
        http.headers(headers ->
                headers.frameOptions(frame -> frame.disable())
        );

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/login").permitAll()
                .requestMatchers("/css/**", "/js/**", "/images/**", "/html/**").permitAll()
                .requestMatchers("/api/**").permitAll()
                .anyRequest().permitAll()
        );

        // ⭐⭐ 로그아웃 기능 추가 부분
        http.logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/html/common/login.html")   // ⭐ 정적 페이지로 명확히 지정
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll()
        );

        return http.build();
    }
}
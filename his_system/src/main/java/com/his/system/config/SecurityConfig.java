package com.his.system.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    // 🔥 JWT 인증 필터 주입 (핵심)
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // 기본 보안 비활성화
        http.csrf(csrf -> csrf.disable());
        http.formLogin(form -> form.disable());
        http.httpBasic(basic -> basic.disable());

        // iframe 허용
        http.headers(headers ->
                headers.frameOptions(frame -> frame.disable())
        );

        http.authorizeHttpRequests(auth -> auth
                // 로그인 API 허용
                .requestMatchers("/api/auth/login").permitAll()

                // 정적 리소스 허용
                .requestMatchers("/css/**", "/js/**", "/images/**", "/html/**").permitAll()

                // 🔐 로그아웃 로그는 인증 필요
                .requestMatchers("/api/admin/system-logs/logout-log").authenticated()

                // 나머지 API는 기존 구조 유지
                .requestMatchers("/api/**").permitAll()

                .anyRequest().permitAll()
        );

        // 🔥 JWT 필터를 Security Filter Chain에 등록 (가장 중요)
        http.addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        // 기본 로그아웃 (현재 구조에서는 거의 사용 안 함)
        http.logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/html/common/login.html")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll()
        );

        return http.build();
    }
}

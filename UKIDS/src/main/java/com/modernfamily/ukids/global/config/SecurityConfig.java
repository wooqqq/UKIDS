package com.modernfamily.ukids.global.config;

import com.modernfamily.ukids.domain.user.mapper.UserMapper;
import com.modernfamily.ukids.global.jwt.JWTFilter;
import com.modernfamily.ukids.global.jwt.JWTUtil;
import com.modernfamily.ukids.global.jwt.LoginFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    // authenticationManager에 넣어줄 인자
    private final AuthenticationConfiguration configuration;
    private final JWTUtil jwtUtil;

    // LoginFilter에 넣어줄 인자
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // jwt 방식은 stateless이기 때문에 csrf에 딱히 방어하지 않아도 된다.
        http.csrf(AbstractHttpConfigurer::disable);

        // jwt 방식 로그인 진행할 것 이기 때문에 disable
        http.formLogin((auth) -> auth.disable());
        http.httpBasic((auth) -> auth.disable());


        http.authorizeHttpRequests((auth) -> auth
                .requestMatchers("/ws/chat").permitAll()
                .anyRequest().authenticated()

        );

        http.addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class);
        // 등록할 필터와 어디에 등록할 것인지
        http.addFilterAt(new LoginFilter(authenticationManager(configuration), jwtUtil), UsernamePasswordAuthenticationFilter.class);

        // 세션 설정 (stateless)
        http.sessionManagement((session) -> session.sessionCreationPolicy((SessionCreationPolicy.STATELESS)));


        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> {
            web.ignoring()
                    .requestMatchers(
                            "/login",
                            "/user/signup",
                            "/ws/chat"
                    );
        };
    }
}

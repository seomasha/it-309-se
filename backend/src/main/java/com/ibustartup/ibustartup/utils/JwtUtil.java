package com.ibustartup.ibustartup.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ibustartup.ibustartup.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secretKey;

    private final long expirationTime;

    public JwtUtil() {
        this.expirationTime = 1000 * 60 * 60;
    }

    public JwtUtil(final long expirationTime) {
        this.expirationTime = expirationTime;
    }

    public String generateToken(final User user) {
        return JWT.create()
                .withSubject(user.getEmail())
                .withClaim("role", user.getRole())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                .sign(Algorithm.HMAC256(secretKey));
    }

    public String extractEmail(final String token) {
        return JWT.decode(token).getSubject();
    }

    public boolean isTokenExpired(final String token) {
        return JWT.decode(token).getExpiresAt().before(new Date());
    }

    public boolean validateToken(final String token, final User user) {
        return !isTokenExpired(token) && user.getEmail().equals(extractEmail(token));
    }
}

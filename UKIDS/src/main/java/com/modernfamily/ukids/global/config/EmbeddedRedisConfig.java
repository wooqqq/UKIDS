package com.modernfamily.ukids.global.config;

import com.modernfamily.ukids.global.exception.CustomException;
import com.modernfamily.ukids.global.exception.ExceptionResponse;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import redis.embedded.RedisServer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Profile("local")
@Configuration
public class EmbeddedRedisConfig {

    private static final String REDIS_SERVER_MAX_MEMORY = "maxmemory 128M";

    @Value("${spring.data.redis.port}")
    private int redisPort;

    private RedisServer redisServer;

    @PostConstruct
    public void startRedis() {
        try {
            int port = isRedisRunning() ? findAvailablePort() : redisPort;
            redisServer = RedisServer.builder()
                    .port(port)
                    .setting(REDIS_SERVER_MAX_MEMORY)
                    .build();

            redisServer.start();
            System.out.println("Redis server started on port " + port);
        } catch (Exception e) {
            System.err.println("Failed to start Redis server: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Can't start Redis server. Check logs for details.", e);
        }
    }

    @PreDestroy
    public void stopRedis() {
        if (redisServer != null) {
            redisServer.stop();
            System.out.println("Redis server stopped.");
        }
    }

    public int findAvailablePort() {
        for (int port = 10000; port <= 65535; port++) {
            Process process = executeNetstatCommand(port);

            if (!isRunning(process)) {
                return port;
            }
        }

        throw new ExceptionResponse(CustomException.NOT_FOUND_AVAILABLE_PORT);
    }

    private boolean isRedisRunning() {
        return isRunning(executeNetstatCommand(redisPort));
    }

    private Process executeNetstatCommand(int port) {
        String command = String.format("netstat -an | findstr LISTENING | findstr %d", port);
        String[] shell = {"cmd", "/c", command};

        try {
            Process process = Runtime.getRuntime().exec(shell);

            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);  // 결과를 콘솔에 출력 (디버깅용)
                }
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("Command execution failed with exit code: " + exitCode);
            }

            return process;

        } catch (IOException | InterruptedException e) {
            System.err.println("Failed to execute command: " + String.join(" ", shell));
            e.printStackTrace();
            throw new RuntimeException("Error executing netstat command", e);
        }
    }

    private boolean isRunning(Process process) {
        StringBuilder output = new StringBuilder();

        try (BufferedReader input = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = input.readLine()) != null) {
                output.append(line);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error reading process output", e);
        }

        return !output.toString().trim().isEmpty();
    }
}

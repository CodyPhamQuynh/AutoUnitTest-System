package com.example.Unit_Test_Generator.service.ai;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;

@Service
public class GeminiService {

    private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);
    private final RestTemplate restTemplate;

    @Value("${gemini.api.key}")
    private String apiKey;

    private static final String API_URL_TEMPLATE = "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=";
    // Chốt sử dụng trực tiếp bản 3.5 Flash Lite
    private static final String MODEL_NAME = "gemini-3.5-flash-lite";

    public GeminiService() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(10));
        factory.setReadTimeout(Duration.ofSeconds(60));
        this.restTemplate = new RestTemplate(factory);
    }

    // Hàm gọi API trực tiếp, loại bỏ logic Fallback
    public String executeApiCall(String requestBody) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType(MediaType.APPLICATION_JSON, StandardCharsets.UTF_8));
        headers.setAcceptCharset(List.of(StandardCharsets.UTF_8));

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        try {
            logger.info("Đang gọi trực tiếp tuyến: {}", MODEL_NAME);
            String url = String.format(API_URL_TEMPLATE, MODEL_NAME) + apiKey;
            return restTemplate.postForObject(url, request, String.class);
        } catch (RestClientResponseException e) {
            logger.error("API Gemini thất bại. Mã HTTP: {}. Nội dung: {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw new RuntimeException("Lỗi kết nối tới Gemini API: " + e.getMessage(), e);
        }
    }
}
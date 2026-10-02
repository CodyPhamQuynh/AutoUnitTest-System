package com.example.Unit_Test_Generator.service.pipeline;

import com.example.Unit_Test_Generator.dto.gemini.TestScenarioResponse;
import com.example.Unit_Test_Generator.service.ai.GeminiService;
import com.example.Unit_Test_Generator.service.ai.PromptBuilderService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

@Service
public class Phase1Service {

    private final GeminiService geminiService;
    private final PromptBuilderService promptBuilder;
    private final ObjectMapper objectMapper;
    private String phase1RequestTemplate;

    public Phase1Service(GeminiService geminiService, PromptBuilderService promptBuilder) {
        this.geminiService = geminiService;
        this.promptBuilder = promptBuilder;
        this.objectMapper = new ObjectMapper();
    }

    @PostConstruct
    public void init() {
        try (Reader reader = new InputStreamReader(new ClassPathResource("gemini-prompt-pha1.json").getInputStream(), StandardCharsets.UTF_8)) {
            phase1RequestTemplate = FileCopyUtils.copyToString(reader);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi đọc file cấu hình prompt lúc khởi động: " + e.getMessage(), e);
        }
    }

    public TestScenarioResponse generateTestScenarios(String dacTaNghiepVu) {
        try {
            // 1. Nhào nặn dữ liệu JSON
            JsonNode rootNode = objectMapper.readTree(phase1RequestTemplate);
            ObjectNode textNode = (ObjectNode) rootNode.get("contents").get(0).get("parts").get(0);
            textNode.put("text", "ĐẶC TẢ NGHIỆP VỤ:\n" + dacTaNghiepVu);

            ObjectNode rootObjectNode = (ObjectNode) rootNode;
            ObjectNode systemInstructionNode = objectMapper.createObjectNode();
            ObjectNode sysPartNode = objectMapper.createObjectNode();

            sysPartNode.put("text", promptBuilder.getPhase1Instruction());
            systemInstructionNode.putArray("parts").add(sysPartNode);

            rootObjectNode.remove("system_instruction");
            rootObjectNode.remove("systemInstruction");
            rootObjectNode.set("systemInstruction", systemInstructionNode);

            String requestBody = objectMapper.writeValueAsString(rootObjectNode);

            // 2. Gọi API thẳng, không dùng Fallback nữa
            String rawResponse = geminiService.executeApiCall(requestBody);

            // 3. Bóc tách JSON trả về
            JsonNode responseNode = objectMapper.readTree(rawResponse);
            JsonNode resultTextNode = responseNode.path("candidates").path(0).path("content").path("parts").path(0).path("text");

            if (!resultTextNode.isMissingNode()) {
                return objectMapper.readValue(resultTextNode.asText(), TestScenarioResponse.class);
            } else {
                throw new RuntimeException("Không tìm thấy trường 'text' trong JSON trả về.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Lỗi trong chu trình Pha 1: " + e.getMessage(), e);
        }
    }
}
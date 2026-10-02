package com.example.Unit_Test_Generator.controller;

import com.example.Unit_Test_Generator.dto.request.Phase1RequestDTO;
import com.example.Unit_Test_Generator.dto.request.Phase2RequestDTO;
import com.example.Unit_Test_Generator.dto.gemini.TestScenarioResponse;
import com.example.Unit_Test_Generator.service.pipeline.Phase1Service;
import com.example.Unit_Test_Generator.service.pipeline.Phase2Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestPipelineController {

    private static final Logger logger = LoggerFactory.getLogger(TestPipelineController.class);
    private final Phase1Service phase1Service;
    private final Phase2Service phase2Service;

    public TestPipelineController(Phase1Service phase1Service, Phase2Service phase2Service) {
        this.phase1Service = phase1Service;
        this.phase2Service = phase2Service;
    }

    @PostMapping("/generate-scenarios")
    public ResponseEntity<?> generateScenarios(@RequestBody Phase1RequestDTO request) {
        try {
            logger.info("Pha 1: Phân tích Đặc tả nghiệp vụ...");
            TestScenarioResponse response = phase1Service.generateTestScenarios(request.getSpec());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Lỗi sinh kịch bản Gemini: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/generate-junit")
    public ResponseEntity<?> generateJUnitCode(@RequestBody Phase2RequestDTO request) {
        try {
            logger.info("Pha 2: Nhận yêu cầu sinh mã JUnit...");
            String mockResult = phase2Service.generateJUnitCode(request);
            return ResponseEntity.ok(Map.of("message", mockResult));
        } catch (Exception e) {
            logger.error("Lỗi sinh code JUnit: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}
package com.example.Unit_Test_Generator.dto.request;

import com.example.Unit_Test_Generator.dto.gemini.TestScenario;
import java.util.List;

public class Phase2RequestDTO {
    private String javaCode;
    private List<TestScenario> approvedScenarios;

    // Getters and Setters
    public String getJavaCode() { return javaCode; }
    public void setJavaCode(String javaCode) { this.javaCode = javaCode; }
    public List<TestScenario> getApprovedScenarios() { return approvedScenarios; }
    public void setApprovedScenarios(List<TestScenario> approvedScenarios) { this.approvedScenarios = approvedScenarios; }
}
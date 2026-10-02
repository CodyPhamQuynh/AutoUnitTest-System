package com.example.Unit_Test_Generator.dto.request;

public class Phase1RequestDTO {
    private String javaCode;
    private String spec;
    private int expectedCoverage;

    // Getters and Setters
    public String getJavaCode() { return javaCode; }
    public void setJavaCode(String javaCode) { this.javaCode = javaCode; }
    public String getSpec() { return spec; }
    public void setSpec(String spec) { this.spec = spec; }
    public int getExpectedCoverage() { return expectedCoverage; }
    public void setExpectedCoverage(int expectedCoverage) { this.expectedCoverage = expectedCoverage; }
}
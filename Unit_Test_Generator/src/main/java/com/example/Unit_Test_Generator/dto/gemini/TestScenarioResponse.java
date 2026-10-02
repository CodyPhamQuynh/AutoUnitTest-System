package com.example.Unit_Test_Generator.dto.gemini;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record TestScenarioResponse(
        @JsonProperty("test_scenarios")
        List<TestScenario> testScenarios
) {}
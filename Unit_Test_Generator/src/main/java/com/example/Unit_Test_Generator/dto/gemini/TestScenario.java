package com.example.Unit_Test_Generator.dto.gemini;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TestScenario(
        @JsonProperty("scenario_name")
        String scenarioName,

        @JsonProperty("input_data")
        String inputData,

        @JsonProperty("expected_output")
        String expectedOutput,

        @JsonProperty("flow_type")
        String flowType
) {}
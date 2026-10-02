package com.example.Unit_Test_Generator.exception;

// Sử dụng để bẻ gãy vòng lặp khi AI sinh test sai logic
public class LogicAssertionException extends RuntimeException {
    public LogicAssertionException(String message) {
        super(message);
    }
}
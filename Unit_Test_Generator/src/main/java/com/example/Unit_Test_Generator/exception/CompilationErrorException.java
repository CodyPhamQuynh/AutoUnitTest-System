package com.example.Unit_Test_Generator.exception;

// Sử dụng để yêu cầu AI tự sửa lỗi nếu mã không biên dịch được
public class CompilationErrorException extends RuntimeException {
    public CompilationErrorException(String message) {
        super(message);
    }
}
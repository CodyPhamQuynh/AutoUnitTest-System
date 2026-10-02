package com.example.Unit_Test_Generator.service.pipeline;

import com.example.Unit_Test_Generator.dto.request.Phase2RequestDTO;
import org.springframework.stereotype.Service;

@Service
public class Phase2Service {

    // Nơi đây sẽ xử lý logic gộp Mã nguồn + Kịch bản JSON để gửi lên Gemini lấy Code JUnit
    public String generateJUnitCode(Phase2RequestDTO request) {
        // TODO: Xử lý ở sprint tiếp theo
        return "Mã code JUnit giả lập...";
    }
}
export const generateScenarios = async (javaCode, spec, expectedCoverage) => {
  const payload = {
    javaCode: javaCode,
    spec: spec,
    expectedCoverage: expectedCoverage
  };

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8081";
  
  try {
    const response = await fetch(`${apiUrl}/api/test/generate-scenarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const rawText = await response.text();
    
    if (!response.ok) {
      let errorMsg = response.statusText;
      try {
        const errorJson = JSON.parse(rawText);
        if (errorJson.error) errorMsg = errorJson.error;
      } catch (e) {
        // Lỗi parse lỗi nội bộ
      }
      throw new Error(errorMsg || "Lỗi kết nối hoặc Backend từ chối.");
    }

    try {
      return JSON.parse(rawText);
    } catch (e) {
      throw new Error("Định dạng JSON trả về bị hỏng. Vui lòng thử lại.");
    }
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error("Không thể kết nối đến Backend. Hãy kiểm tra Spring Boot đã chạy chưa!");
    }
    throw error;
  }
};
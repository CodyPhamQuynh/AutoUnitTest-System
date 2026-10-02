# AutoUnitTest-System (LLM-based Java Unit Test Generator)

Hệ thống tự động sinh và xác minh ca kiểm thử đơn vị (Unit Test) cho Java dựa trên Đặc tả nghiệp vụ bằng ngôn ngữ tự nhiên. Dự án tập trung giải quyết bài toán chống "AI nịnh bợ" (AI Sycophancy) và đánh giá chất lượng tự động bằng LLM Judge.

## 🚀 Giới thiệu (Overview)
Hệ thống giúp tự động hóa quy trình viết JUnit Test cho ngôn ngữ Java thông qua 3 pha xử lý:
1. **Pha 1 (Chống Nịnh bợ):** Phân tích Đặc tả nghiệp vụ, kết hợp Prompt Engineering ép buộc LLM (Gemini) sinh Kịch bản kiểm thử chuẩn dạng JSON (Ground Truth). Người dùng kiểm duyệt ở Chốt chặn 1.
2. **Pha 2 (Sinh Code & Chống Ảo tưởng):** Ghép mã nguồn Java với JSON đã duyệt, giới hạn AI chỉ sử dụng thư viện Mockito để sinh code JUnit.
3. **Pha 3 (Thực thi & Đánh giá):** Chạy ngầm tiến trình (ProcessBuilder) để biên dịch và chạy `mvn test`. Đo lường độ phủ vật lý bằng **JaCoCo** và chấm điểm chất lượng tự động bằng **LLM Judge** theo 9 tiêu chí.

## 🛠 Công nghệ sử dụng (Tech Stack)
* **Backend:** Java 17, Spring Boot 3.x, Apache Maven, ProcessBuilder (CLI execution).
* **Frontend:** React.js, Vite, PrismJS (Syntax Highlighting).
* **Đo lường & Phân tích:** JaCoCo Java Agent.
* **AI Model:** Google Gemini API (Structured Outputs - JSON Schema).

## 📈 Tiến độ dự án (Project Status)
Dự án đang trong giai đoạn phát triển tích cực (thời hạn 3 tháng). 
- [x] Hoàn thành luồng Phân tích Đặc tả và sinh JSON Kịch bản (Pha 1).
- [x] Hoàn thành Giao diện Web (UI/UX) và hệ thống kiểm duyệt Chốt chặn 1.
- [ ] Đang xây dựng luồng sinh Code JUnit từ bộ kịch bản JSON (Pha 2).
- [ ] Tích hợp ProcessBuilder chạy ngầm và JaCoCo (Pha 3).

## ⚙️ Hướng dẫn cài đặt (Local Setup)

### 1. Yêu cầu hệ thống
* JDK 17+
* Apache Maven 3.9+
* Node.js & npm
* Google Gemini API Key

### 2. Cài đặt Backend
1. Đi tới thư mục `backend/`
2. Tạo file `application.properties` trong `src/main/resources` và thêm API Key: `gemini.api.key=YOUR_API_KEY`
3. Chạy lệnh: `mvn clean install`
4. Khởi động ứng dụng Spring Boot.

### 3. Cài đặt Frontend
1. Đi tới thư mục `frontend/`
2. Chạy lệnh cài đặt thư viện: `npm install`
3. Khởi động môi trường dev: `npm run dev`
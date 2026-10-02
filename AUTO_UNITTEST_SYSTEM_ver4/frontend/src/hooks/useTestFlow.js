import { useState, useEffect } from "react";
import { generateScenarios } from "../services/apiService";

export const useTestFlow = () => {
  // 1. Khởi tạo State từ sessionStorage (nếu có)
  const [javaCode, setJavaCode] = useState(() => sessionStorage.getItem("ut_javaCode") || "");
  const [spec, setSpec] = useState(() => sessionStorage.getItem("ut_spec") || "");
  const [coverage, setCoverage] = useState(() => parseInt(sessionStorage.getItem("ut_coverage")) || 80);
  
  const [scenarios, setScenarios] = useState(() => {
    const savedScenarios = sessionStorage.getItem("ut_scenarios");
    return savedScenarios ? JSON.parse(savedScenarios) : [];
  });
  
  const [currentPhase, setCurrentPhase] = useState(() => {
    return parseInt(sessionStorage.getItem("ut_currentPhase")) || 1;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", text: "" });

  const isReviewing = scenarios.length > 0 && currentPhase === 1;

  // 2. Đồng bộ State với sessionStorage liên tục khi có thay đổi
  useEffect(() => {
    sessionStorage.setItem("ut_javaCode", javaCode);
    sessionStorage.setItem("ut_spec", spec);
    sessionStorage.setItem("ut_coverage", coverage);
    sessionStorage.setItem("ut_scenarios", JSON.stringify(scenarios));
    sessionStorage.setItem("ut_currentPhase", currentPhase);
  }, [javaCode, spec, coverage, scenarios, currentPhase]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!javaCode.trim() || !spec.trim()) {
      setAlert({ type: "error", text: "Vui lòng nhập đầy đủ Mã nguồn Java và Đặc tả nghiệp vụ." });
      return;
    }
    
    setIsLoading(true);
    setAlert({ type: "", text: "" }); 
    setScenarios([]); 

    try {
      const jsonResult = await generateScenarios(javaCode, spec, parseInt(coverage));
      
      if (jsonResult && jsonResult.test_scenarios) {
          const scenariosWithId = jsonResult.test_scenarios.map(s => ({
              ...s,
              _id: crypto.randomUUID() 
          }));
          
          setScenarios(scenariosWithId);
          setCurrentPhase(1); 
          setAlert({ type: "success", text: "Phân tích thành công! Vui lòng duyệt kịch bản bên dưới." });
      } else {
          setAlert({ type: "error", text: "Dữ liệu trả về không đúng định dạng Schema mong đợi." });
      }
    } catch (error) {
      setAlert({ type: "error", text: "Lỗi: " + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleScenarioChange = (index, field, value) => {
    const updatedScenarios = [...scenarios];
    updatedScenarios[index] = { ...updatedScenarios[index], [field]: value };
    setScenarios(updatedScenarios);
  };

  const handleAddScenario = () => {
    const newScenario = {
      _id: crypto.randomUUID(),
      scenario_name: "",
      input_data: "",
      expected_output: "",
      flow_type: "Luồng chính"
    };
    setScenarios([...scenarios, newScenario]);
  };

  const handleDeleteScenario = (indexToRemove) => {
    const updatedScenarios = scenarios.filter((_, index) => index !== indexToRemove);
    setScenarios(updatedScenarios);
  };

  const handleRejectScenario = () => {
    setScenarios([]);
    setCurrentPhase(1);
    setAlert({ type: "error", text: "Đã hủy kịch bản. Vui lòng chỉnh sửa đặc tả và sinh lại." });
  };

  const handleApproveScenario = () => {
    setCurrentPhase(2);
    setAlert({ type: "success", text: "Kịch bản đã chốt! Sẵn sàng chuyển dữ liệu sang Pha 2 để sinh mã JUnit..." });
  };

  // 3. Thêm hàm xử lý quay lại Pha 1
  const handleBackToPhase1 = () => {
    setCurrentPhase(1);
    setAlert({ type: "info", text: "Đã quay lại Pha 1. Bạn có thể tiếp tục chỉnh sửa kịch bản." });
  };

  return {
    javaCode, setJavaCode,
    spec, setSpec,
    coverage, setCoverage,
    scenarios, currentPhase,
    isLoading, alert, isReviewing,
    handleSubmit, handleScenarioChange, 
    handleAddScenario, handleDeleteScenario, 
    handleRejectScenario, handleApproveScenario,
    handleBackToPhase1
  };
};
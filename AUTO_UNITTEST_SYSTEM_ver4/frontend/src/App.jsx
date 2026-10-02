import React, { useState } from "react";
import "./styles/App.css"; 

import iconCody from './assets/icon_cody.png'; 
import logoCody from './assets/Logo_Cody.png';

import CodeEditor from "./components/Editor/CodeEditor";
import ScenarioTable from "./components/Tables/ScenarioTable";
import { useTestFlow } from "./hooks/useTestFlow";

function App() {
  const {
    javaCode, setJavaCode,
    spec, setSpec,
    coverage, setCoverage,
    scenarios, currentPhase,
    isLoading, alert, isReviewing,
    handleSubmit, handleScenarioChange, 
    handleAddScenario, handleDeleteScenario, 
    handleRejectScenario, handleApproveScenario,
    handleBackToPhase1
  } = useTestFlow();

  // Khôi phục lại State quản lý Modal
  const [showConfirmBack, setShowConfirmBack] = useState(false);

  const confirmBack = () => {
    setShowConfirmBack(false);
    handleBackToPhase1();
  };

  const cancelBack = () => {
    setShowConfirmBack(false);
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo-area">
          <img 
            src={iconCody} 
            alt="UT Icon" 
            style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} 
          />
          <div className="logo-text">
            <h2>Test Generator</h2>
          </div>
        </div>
        
        <div className="stepper-menu">
          <div className={`step-item ${currentPhase >= 1 ? 'active' : ''}`}>
             <div className="step-circle">1</div>
             <div className="step-content">
               <div className="step-title">Pha 1: Phân tích</div>
               <div className="step-desc">Chống nịnh bợ & Lấy chuẩn</div>
             </div>
          </div>
          <div className={`step-item ${currentPhase >= 2 ? 'active' : ''}`}>
             <div className="step-circle">2</div>
             <div className="step-content">
               <div className="step-title">Pha 2: Sinh Code</div>
               <div className="step-desc">Tạo JUnit Test Case</div>
             </div>
          </div>
          <div className={`step-item ${currentPhase >= 3 ? 'active' : ''}`}>
             <div className="step-circle">3</div>
             <div className="step-content">
               <div className="step-title">Pha 3: Thực thi</div>
               <div className="step-desc">Đo lường bằng JaCoCo</div>
             </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="header-title">
            <h1>Phân tích Kịch bản & Đặc tả</h1>
          </div>
          
          <div className="user-profile">
            <img 
              src={logoCody} 
              alt="Cody Logo" 
              style={{ height: '125px', objectFit: 'contain' }} 
            />
          </div>
        </header>

        <div className="workspace">
          <form onSubmit={handleSubmit} className="input-form">
            <div className="card">
              <div className="card-title">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Mã nguồn Java cần Test
              </div>
              <CodeEditor 
                value={javaCode} 
                onChange={setJavaCode} 
                disabled={isReviewing} 
              />
            </div>

            <div className="card-right">
              <div className="card" style={{ marginBottom: '24px' }}>
                <div className="card-title">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Đặc tả nghiệp vụ
                </div>
                <textarea
                  value={spec}
                  onChange={(e) => setSpec(e.target.value)}
                  disabled={isReviewing || currentPhase !== 1}
                  placeholder="Ví dụ: Hàm tính toán giảm giá yêu cầu truyền vào tổng tiền..."
                  style={{ backgroundColor: (isReviewing || currentPhase !== 1) ? "#f1f5f9" : "#fafafa" }}
                />
              </div>

              <div className="card">
                <div className="card-title">Thiết lập tham số</div>
                <div style={{ marginBottom: '10px', fontSize: '13px', color: '#64748b' }}>Tỷ lệ độ phủ kỳ vọng:</div>
                <div className="coverage-control">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={coverage}
                    onChange={(e) => setCoverage(e.target.value)}
                    disabled={isReviewing || currentPhase !== 1}
                  />
                  
                  <div style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    background: '#eff6ff', borderRadius: '8px', padding: '6px 8px', 
                    border: '1px solid #bfdbfe', minWidth: '75px' 
                  }}>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={coverage}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (val !== '') {
                          val = parseInt(val);
                          if (val > 100) val = 100;
                          if (val < 1) val = 1;
                        }
                        setCoverage(val);
                      }}
                      onBlur={() => {
                        if (coverage === '' || coverage < 1) setCoverage(80);
                      }}
                      disabled={isReviewing || currentPhase !== 1}
                      style={{
                        width: '32px', border: 'none', background: 'transparent',
                        color: '#3b82f6', fontWeight: '600', fontSize: '14px',
                        textAlign: 'right', outline: 'none', padding: '0'
                      }}
                    />
                    <span style={{ color: '#3b82f6', fontWeight: '600', fontSize: '14px', marginLeft: '2px' }}>%</span>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={isLoading || isReviewing || currentPhase !== 1}>
                  {isLoading ? (
                    "Đang phân tích bằng AI..."
                  ) : (
                    <>
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      Bắt đầu Phân tích Kịch bản
                    </>
                  )}
                </button>
                
                {alert.text && (
                  <div style={{ 
                    marginTop: '15px', padding: '12px', borderRadius: '8px', textAlign: 'center', fontSize: '13px', fontWeight: '500',
                    backgroundColor: alert.type === 'error' ? '#fff1f2' : '#f0fdf4',
                    color: alert.type === 'error' ? '#e11d48' : '#166534',
                    border: `1px solid ${alert.type === 'error' ? '#fecdd3' : '#bbf7d0'}`
                  }}>
                    {alert.text}
                  </div>
                )}
              </div>
            </div>
          </form>

          {currentPhase === 1 && scenarios.length > 0 && (
            <ScenarioTable 
              scenarios={scenarios} 
              onReject={handleRejectScenario} 
              onApprove={handleApproveScenario}
              onScenarioChange={handleScenarioChange}
              onAddScenario={handleAddScenario}
              onDeleteScenario={handleDeleteScenario}
            />
          )}

          {currentPhase === 2 && (
             <div className="card" style={{ marginTop: '24px', textAlign: 'center', padding: '40px' }}>
                <h3 style={{ color: '#1e3a8a', marginBottom: '10px' }}>Đang chờ triển khai Pha 2...</h3>
                <p style={{ color: '#64748b', marginBottom: '24px' }}>Kịch bản kiểm thử đã được chốt và tự động lưu. Giao diện tiếp theo sẽ gọi API để sinh mã JUnit dựa trên dữ liệu này.</p>
                
                {/* Khôi phục lại nút bấm mở Modal */}
                <button 
                  onClick={() => setShowConfirmBack(true)}
                  style={{
                    padding: '10px 20px', backgroundColor: '#f8fafc', color: '#475569', 
                    border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', 
                    fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Quay lại chỉnh sửa Kịch bản (Pha 1)
                </button>
             </div>
          )}

          {/*CUSTOM MODAL XÁC NHẬN QUAY LẠI */}
          {showConfirmBack && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-icon">
                  <svg width="28" height="28" fill="none" stroke="#ef4444" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3>Xác nhận quay lại</h3>
                <p>Bạn có chắc chắn muốn quay lại Pha 1? Mã JUnit sắp được sinh sẽ bị hủy và bạn phải sinh lại từ đầu.</p>
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={cancelBack}>Hủy</button>
                  <button className="btn-confirm-delete" onClick={confirmBack}>Đồng ý quay lại</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
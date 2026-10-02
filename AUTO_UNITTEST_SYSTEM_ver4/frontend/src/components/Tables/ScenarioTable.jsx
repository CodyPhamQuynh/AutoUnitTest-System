import React, { useState } from 'react';

const ScenarioTable = ({ scenarios, onReject, onApprove, onScenarioChange, onAddScenario, onDeleteScenario }) => {
  // State quản lý việc hiển thị modal xác nhận xóa
  const [deletingIndex, setDeletingIndex] = useState(null);

  const getBadgeClass = (flowType) => {
    if (!flowType) return 'badge-green'; 
    const typeStr = String(flowType).toLowerCase();
    if (typeStr.includes('ngoại lệ')) return 'badge-red';
    if (typeStr.includes('giá trị biên') || typeStr.includes('biên')) return 'badge-warning';
    if (typeStr.includes('tổ hợp') || typeStr.includes('chéo')) return 'badge-primary';
    return 'badge-green';
  };

  // Các hàm xử lý xóa
  const confirmDelete = () => {
    if (deletingIndex !== null) {
      onDeleteScenario(deletingIndex);
      setDeletingIndex(null); // Đóng modal sau khi xóa
    }
  };

  const cancelDelete = () => {
    setDeletingIndex(null); // Đóng modal, không làm gì cả
  };

  return (
    <div className="scenarios-container">
      <h2>Chốt chặn 1: Duyệt Kịch bản Kiểm thử Đa chiều</h2>
      <p style={{ marginBottom: '20px', color: '#64748b', fontSize: '14px' }}>
        Bạn có đồng ý với Kịch bản nghiệp vụ này không? (Có thể thêm, sửa, xóa trực tiếp dữ liệu bên dưới trước khi chốt)
      </p>
      
      <div style={{ overflowX: 'auto' }}>
        <table className="scenario-table">
          <thead>
            <tr>
              <th style={{ width: '5%', textAlign: 'center' }}>STT</th>
              <th style={{ width: '20%' }}>Tên kịch bản</th>
              <th style={{ width: '27%' }}>Dữ liệu đầu vào</th>
              <th style={{ width: '25%' }}>Kết quả mong đợi</th>
              <th style={{ width: '18%', textAlign: 'center' }}>Loại luồng</th>
              <th style={{ width: '5%', textAlign: 'center' }}>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((scenario, index) => {
              const currentFlowType = scenario.flow_type || (scenario.is_edge_case ? 'Ngoại lệ' : 'Luồng chính');
              
              return (
                <tr key={scenario._id || index}>
                  <td style={{ textAlign: 'center', fontWeight: '600', color: '#64748b' }}>
                    {index + 1}
                  </td>
                  <td>
                    <textarea
                      value={scenario.scenario_name || ''}
                      onChange={(e) => onScenarioChange(index, 'scenario_name', e.target.value)}
                      style={{ 
                        width: '100%', minHeight: '70px', padding: '10px', 
                        borderRadius: '8px', border: '1px solid #e2e8f0', 
                        fontSize: '13px', resize: 'vertical',
                        backgroundColor: '#fafafa', outline: 'none'
                      }}
                      placeholder="Nhập tên kịch bản..."
                    />
                  </td>
                  <td>
                    <textarea
                      value={scenario.input_data || ''}
                      onChange={(e) => onScenarioChange(index, 'input_data', e.target.value)}
                      style={{ 
                        width: '100%', minHeight: '70px', padding: '10px', 
                        borderRadius: '8px', border: '1px solid #e2e8f0', 
                        fontSize: '13px', resize: 'vertical',
                        backgroundColor: '#fafafa', outline: 'none'
                      }}
                      placeholder="Nhập dữ liệu đầu vào..."
                    />
                  </td>
                  <td>
                    <textarea
                      value={scenario.expected_output || ''}
                      onChange={(e) => onScenarioChange(index, 'expected_output', e.target.value)}
                      style={{ 
                        width: '100%', minHeight: '70px', padding: '10px', 
                        borderRadius: '8px', border: '1px solid #e2e8f0', 
                        fontSize: '13px', resize: 'vertical',
                        backgroundColor: '#fafafa', outline: 'none'
                      }}
                      placeholder="Nhập kết quả mong đợi..."
                    />
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <select
                      className={`badge ${getBadgeClass(currentFlowType)}`}
                      value={currentFlowType}
                      onChange={(e) => onScenarioChange(index, 'flow_type', e.target.value)}
                      style={{ 
                        width: '100%', minWidth: '170px', cursor: 'pointer', 
                        outline: 'none', padding: '8px', fontFamily: 'inherit',
                        textAlign: 'center', textAlignLast: 'center'
                      }}
                    >
                      <option value="Luồng chính">Luồng chính</option>
                      <option value="Ngoại lệ">Ngoại lệ</option>
                      <option value="Giá trị biên">Giá trị biên</option>
                      <option value="Tổ hợp điều kiện chéo">Tổ hợp điều kiện chéo</option>
                    </select>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <button 
                      onClick={() => setDeletingIndex(index)} // Mở modal thay vì window.confirm
                      title="Xóa kịch bản này"
                      style={{
                        background: 'transparent', border: 'none', color: '#ef4444',
                        cursor: 'pointer', padding: '8px', borderRadius: '8px',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
            
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '15px' }}>
                <button className="btn-add-scenario" onClick={onAddScenario} title="Thêm kịch bản kiểm thử mới">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="action-buttons">
        <button className="btn-reject" onClick={onReject}>
          Không đồng ý (Sinh lại)
        </button>
        <button className="btn-approve" onClick={onApprove}>
          Đồng ý (Chốt kịch bản)
        </button>
      </div>

      {/* --- CUSTOM MODAL XÁC NHẬN XÓA --- */}
      {deletingIndex !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">
              <svg width="28" height="28" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3>Xác nhận xóa</h3>
            <p>Bạn có chắc chắn muốn xóa kịch bản kiểm thử này? Hành động này không thể hoàn tác.</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={cancelDelete}>Hủy</button>
              <button className="btn-confirm-delete" onClick={confirmDelete}>Xóa kịch bản</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioTable;
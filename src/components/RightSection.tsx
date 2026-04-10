import React from 'react';

const RightSection = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.headerTitle}>Contextual Chat</h3>
        <span style={styles.statusDot}></span>
      </div>
      
      <div style={styles.chatArea}>
        <div style={styles.msgWrapper}>
          <div style={styles.aiMsg}>
            Hello! I've indexed your sources. You can ask me to compare profiles or summarize specific skills.
          </div>
        </div>
      </div>

      <div style={styles.inputArea}>
        <div style={styles.inputWrapper}>
          <input style={styles.chatInput} placeholder="Ask a question..." />
          <button style={styles.sendBtn}>➔</button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { width: '350px', display: 'flex', flexDirection: 'column', background: '#020617' },
  header: { padding: '24px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '10px' },
  headerTitle: { fontSize: '14px', fontWeight: 600, color: '#f8fafc', margin: 0 },
  statusDot: { width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' },
  chatArea: { flex: 1, padding: '20px', overflowY: 'auto' },
  msgWrapper: { display: 'flex', justifyContent: 'flex-start' },
  aiMsg: { 
    background: '#1e293b', 
    padding: '14px', 
    borderRadius: '16px 16px 16px 0', 
    fontSize: '13px', 
    lineHeight: '1.5',
    color: '#cbd5e1',
    maxWidth: '85%',
    border: '1px solid #334155'
  },
  inputArea: { padding: '20px' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  chatInput: { 
    width: '100%', 
    padding: '14px 45px 14px 20px', 
    borderRadius: '24px', 
    border: '1px solid #334155', 
    background: '#0f172a', 
    color: 'white',
    fontSize: '13px',
    outline: 'none'
  },
  sendBtn: { 
    position: 'absolute', 
    right: '8px', 
    background: '#3b82f6', 
    border: 'none', 
    color: 'white', 
    width: '32px', 
    height: '32px', 
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default RightSection;
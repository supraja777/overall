import React from 'react';

const ExecutiveVerdict = ({ summary }: any) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.badge}>HIRE_RECOMMENDATION</div>
      </div>
      <p style={styles.summaryText}>{summary || "Synthesizing full candidate profile across all technical domains..."}</p>
      
      <div style={styles.nextSteps}>
        <span style={styles.stepHeader}>SUGGESTED_NEXT_ACTION:</span>
        <div style={styles.stepItem}>Deep-dive into System Design & Concurrency.</div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { width: '100%', textAlign: 'left' },
  header: { marginBottom: '15px' },
  badge: { display: 'inline-block', background: '#be185d', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 900 },
  summaryText: { fontSize: '15px', color: '#f8fafc', lineHeight: '1.8', marginBottom: '20px' },
  nextSteps: { borderTop: '1px solid #1e293b', paddingTop: '15px' },
  stepHeader: { fontSize: '9px', fontWeight: 900, color: '#475569', display: 'block', marginBottom: '8px' },
  stepItem: { fontSize: '12px', color: '#be185d', fontWeight: 700, fontStyle: 'italic' }
};

export default ExecutiveVerdict;
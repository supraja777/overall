import React from 'react';

const LeetCodeAnalysis = ({ data }: any) => {
  return (
    <div style={styles.container}>
      <div style={styles.statsGrid}>
        <div style={styles.stat}>
          <span style={styles.val}>94th</span>
          <span style={styles.lab}>PERCENTILE</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.val}>450+</span>
          <span style={styles.lab}>SOLVED</span>
        </div>
      </div>

      <div style={styles.insightBox}>
        <div style={styles.label}>ALGORITHMIC_PATTERN</div>
        <p style={styles.text}>{data?.content || "Analyzing LeetCode profile patterns..."}</p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { width: '100%' },
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' },
  stat: { background: '#09090b', padding: '15px', borderRadius: '8px', border: '1px solid #1e293b', textAlign: 'center' },
  val: { display: 'block', fontSize: '24px', fontWeight: 900, color: '#be185d' },
  lab: { fontSize: '8px', fontWeight: 800, color: '#475569', marginTop: '4px' },
  insightBox: { background: 'linear-gradient(to bottom right, #111114, #09090b)', padding: '15px', borderRadius: '8px', borderLeft: '2px solid #be185d', textAlign: 'left' },
  label: { fontSize: '9px', fontWeight: 900, color: '#be185d', marginBottom: '8px' },
  text: { fontSize: '12px', color: '#94a3b8', lineHeight: '1.5', margin: 0 }
};

export default LeetCodeAnalysis;
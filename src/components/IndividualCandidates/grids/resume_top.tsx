import React from 'react';

const ResumeTop = () => (
  <div style={styles.container}>
    <div style={styles.scoreCircle}>97%</div>
    <div style={styles.textContainer}>
      <span style={styles.status}>RESUME_VERIFIED</span>
      <p style={styles.description}>Resume is <span style={styles.highlight}>97% strong</span> for this role.</p>
    </div>
  </div>
);

const styles = {
  container: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' },
  scoreCircle: { 
    width: '60px', height: '60px', borderRadius: '50%', border: '3px solid #be185d',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '18px', fontWeight: 900, color: '#f8fafc', background: 'rgba(190, 24, 93, 0.1)'
  },
  textContainer: { textAlign: 'left' as const },
  status: { fontSize: '9px', fontWeight: 800, color: '#475569', letterSpacing: '1px' },
  description: { fontSize: '13px', color: '#cbd5e1', margin: '4px 0 0 0' },
  highlight: { color: '#be185d', fontWeight: 700 }
};

export default ResumeTop;
import React from 'react';

const PortfolioAnalysis = ({ data }: any) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.status}>VERIFIED_PROJECTS</span>
      </div>
      
      <div style={styles.content}>
        <div style={styles.highlightCard}>
          <div style={styles.cardTag}>KEY_INSIGHT</div>
          <p style={styles.p}>{data?.content || "No portfolio data extracted."}</p>
        </div>
        
        <div style={styles.stackRow}>
          {['React', 'Vite', 'Node.js', 'AWS'].map(tech => (
            <span key={tech} style={styles.techBadge}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { width: '100%' },
  header: { marginBottom: '15px', textAlign: 'left' },
  status: { fontSize: '9px', fontWeight: 900, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '4px 8px', borderRadius: '4px' },
  content: { display: 'flex', flexDirection: 'column', gap: '15px' },
  highlightCard: { background: '#1a1a1e', border: '1px solid #334155', padding: '15px', borderRadius: '8px', textAlign: 'left' },
  cardTag: { fontSize: '8px', fontWeight: 900, color: '#94a3b8', marginBottom: '8px' },
  p: { fontSize: '13px', color: '#cbd5e1', margin: 0, lineHeight: '1.6' },
  stackRow: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  techBadge: { fontSize: '10px', color: '#94a3b8', border: '1px solid #1e293b', padding: '2px 8px', borderRadius: '100px' }
};

export default PortfolioAnalysis;
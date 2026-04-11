import React from 'react';

const ResumeAnalysis = ({ data }: any) => {
  // Parsing example analysis text into bullet points
  const points = data?.content?.split('\n').filter((p: string) => p.trim() !== '') || [];

  return (
    <div style={styles.container}>
      <div style={styles.scoreRow}>
        <div style={styles.radialScore}>85%</div>
        <div style={styles.scoreLabel}>JD_ALIGNMENT</div>
      </div>
      
      <div style={styles.list}>
        {points.map((point: string, i: number) => (
          <div key={i} style={styles.item}>
            <span style={styles.bullet}>▶</span>
            <span style={styles.text}>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { width: '100%', padding: '10px' },
  scoreRow: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' },
  radialScore: { fontSize: '32px', fontWeight: 900, color: '#be185d' },
  scoreLabel: { fontSize: '10px', fontWeight: 800, color: '#64748b', letterSpacing: '1px' },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  item: { display: 'flex', gap: '10px', fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' },
  bullet: { color: '#be185d', fontSize: '10px', marginTop: '4px' },
  text: { textAlign: 'left' }
};

export default ResumeAnalysis;
import React from 'react';

const ResumeTop = ({ percentage }: { percentage: number }) => {
  const sqSize = 70;
  const strokeWidth = 5;
  const radius = (sqSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * percentage) / 100;

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <span style={styles.mainTitle}>RESUME_ALIGNMENT</span>
        <span style={styles.categoryLabel}>PDF_CORE</span>
      </div>

      <div style={styles.scoreContent}>
        <div style={styles.radialWrapper}>
          <svg width={sqSize} height={sqSize} viewBox={`0 0 ${sqSize} ${sqSize}`}>
            <circle cx={sqSize/2} cy={sqSize/2} r={radius} strokeWidth={strokeWidth} style={styles.track} />
            <circle 
              cx={sqSize/2} cy={sqSize/2} r={radius} strokeWidth={strokeWidth} 
              style={styles.progress} strokeDasharray={circumference} strokeDashoffset={offset}
              transform={`rotate(-90 ${sqSize/2} ${sqSize/2})`}
            />
          </svg>
          <div style={styles.percentageText}>{percentage}%</div>
        </div>

        <div style={styles.verdictWrapper}>
          <div style={styles.verdictLabel}>NEURAL_VALIDATION</div>
          <p style={styles.verdictSentence}>
            Resume is <span style={styles.pinkHighlight}>{percentage}% strong</span> for this role.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    padding: '24px 24px 16px 24px', 
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    background: 'rgba(15, 23, 42, 0.3)', // Slight contrast for the header
    flexShrink: 0, // This is key: it tells Flexbox "never shrink or move this"
    zIndex: 10
  },
  headerRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px' },
  mainTitle: { fontSize: '11px', fontWeight: 900, color: '#f8fafc', letterSpacing: '1.5px' },
  categoryLabel: { fontSize: '10px', fontWeight: 800, color: '#be185d', letterSpacing: '1px' },
  scoreContent: { display: 'flex', alignItems: 'center', gap: '24px' },
  radialWrapper: { position: 'relative' as const, width: '70px', height: '70px' },
  track: { fill: 'none', stroke: '#1e293b' },
  progress: { fill: 'none', stroke: '#be185d', strokeLinecap: 'round' as const, transition: '0.5s' },
  percentageText: { position: 'absolute' as const, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontSize: '16px', fontWeight: 900 },
  verdictWrapper: { display: 'flex', flexDirection: 'column' as const },
  verdictLabel: { fontSize: '9px', color: '#64748b', fontWeight: 800, marginBottom: '4px', letterSpacing: '1px' },
  verdictSentence: { fontSize: '13px', color: '#cbd5e1', margin: 0, fontWeight: 400 },
  pinkHighlight: { color: '#be185d', fontWeight: 800 }
};

export default ResumeTop;
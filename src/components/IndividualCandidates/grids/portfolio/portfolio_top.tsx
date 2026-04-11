import React from 'react';

const PortfolioTop = ({ matchScore = 0, languages = [], frameworks = [] }: any) => {
  const radius = 34; 
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.min(Math.max(matchScore, 0), 100);
  const offset = circumference - (safeScore / 100) * circumference;
  const topTech = [...languages, ...frameworks];

  return (
    <div style={styles.container}>
      <div style={styles.headerLayout}>
        <div style={styles.ringWrapper}>
          <svg width="90" height="90" style={styles.svg}>
            <circle cx="45" cy="45" r={radius} style={styles.backgroundCircle} />
            <circle
              cx="45" cy="45" r={radius}
              style={{
                ...styles.progressCircle,
                strokeDasharray: circumference,
                strokeDashoffset: isNaN(offset) ? circumference : offset,
              }}
            />
          </svg>
          <div style={styles.scoreText}>
            <span style={styles.percentage}>{safeScore}</span>
            <span style={styles.unit}>%</span>
          </div>
        </div>

        <div style={styles.statusBox}>
          <div style={styles.labelRow}>
            <div style={styles.glowDot} />
            <span style={styles.label}>PORTFOLIO_MATCH_ENGINE</span>
          </div>
          <h3 style={styles.matchTitle}>
            Alignment: <span style={styles.highlight}>{safeScore}%</span>
          </h3>
          <p style={styles.subText}>Project architecture verified.</p>
        </div>
      </div>

      <div style={styles.skillsSection}>
        <span style={styles.label}>EXTRACTED_STACK</span>
        <div style={styles.chipGrid}>
          {topTech.slice(0, 8).map((tech, i) => (
            <span key={i} style={styles.skillChip}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', flexDirection: 'column' as const, gap: '20px', width: '100%' },
  headerLayout: { display: 'flex', alignItems: 'center', gap: '20px' },
  ringWrapper: { position: 'relative' as const, width: '90px', height: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  svg: { transform: 'rotate(-90deg)' },
  backgroundCircle: { fill: 'none', stroke: '#1e293b', strokeWidth: 5 },
  progressCircle: { fill: 'none', stroke: '#be185d', strokeWidth: 5, strokeLinecap: 'round' as const, filter: 'drop-shadow(0 0 4px rgba(190, 24, 93, 0.6))', transition: 'stroke-dashoffset 1s ease-in-out' },
  scoreText: { position: 'absolute' as const, display: 'flex', alignItems: 'baseline' },
  percentage: { fontSize: '20px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)' },
  unit: { fontSize: '10px', color: '#be185d', fontWeight: 700, marginLeft: '1px' },
  statusBox: { display: 'flex', flexDirection: 'column' as const, gap: '4px' },
  labelRow: { display: 'flex', alignItems: 'center', gap: '6px' },
  glowDot: { width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#be185d', boxShadow: '0 0 8px #be185d' },
  label: { fontSize: '9px', fontWeight: 800, color: '#475569', fontFamily: 'var(--font-mono)', letterSpacing: '1px' },
  matchTitle: { fontSize: '16px', fontWeight: 700, color: '#f1f5f9', margin: 0 },
  highlight: { color: '#be185d' },
  subText: { fontSize: '11px', color: '#64748b', margin: 0 },
  skillsSection: { display: 'flex', flexDirection: 'column' as const, gap: '10px' },
  chipGrid: { display: 'flex', flexWrap: 'wrap' as const, gap: '6px' },
  skillChip: { fontSize: '10px', padding: '4px 10px', backgroundColor: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', color: '#cbd5e1', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' as const, letterSpacing: '0.5px' },
};

export default PortfolioTop;
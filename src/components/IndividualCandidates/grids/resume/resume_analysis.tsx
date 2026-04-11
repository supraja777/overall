import React from 'react';

const ResumeAnalysis = ({ data }: any) => {
  const getCompanyName = (expString: string) => expString.split('-')[0].trim();

  return (
    <div style={styles.container}>
      <div style={styles.badge}>VERIFIED_HISTORY</div>

      <div style={styles.section}>
        <span style={styles.label}>EXPERIENCE_HISTORY</span>
        <div style={styles.entityGrid}>
          {data.experience_history?.map((exp: string, i: number) => (
            <div key={i} style={styles.entityItem}>
              <div style={styles.bullet} />
              <span style={styles.entityText}>{getCompanyName(exp)}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <span style={styles.label}>TOP_10_JD_SKILLS</span>
        <div style={styles.skillRow}>
          {data.relevant_skills_to_jd?.slice(0, 10).map((skill: string) => (
            <span key={skill} style={styles.chip}>{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '24px' },
  badge: { 
    display: 'inline-block', fontSize: '8px', fontWeight: 900, color: '#10b981', 
    background: 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: '4px', marginBottom: '20px' 
  },
  section: { marginBottom: '28px' },
  label: { fontSize: '9px', fontWeight: 900, color: '#475569', letterSpacing: '1.2px', display: 'block', marginBottom: '12px' },
  entityGrid: { display: 'flex', flexDirection: 'column' as const, gap: '10px' },
  entityItem: { display: 'flex', alignItems: 'center', gap: '10px' },
  bullet: { width: '4px', height: '4px', borderRadius: '50%', background: '#be185d' },
  entityText: { fontSize: '14px', color: '#cbd5e1', fontWeight: 500 },
  skillRow: { display: 'flex', flexWrap: 'wrap' as const, gap: '8px' },
  chip: { 
    fontSize: '10px', color: '#94a3b8', border: '1px solid #1e293b', 
    padding: '5px 12px', borderRadius: '20px', fontWeight: 600, background: 'rgba(30, 41, 59, 0.1)' 
  }
};

export default ResumeAnalysis;
import React from 'react';

interface AnalysisProps {
  verdict?: string;
  topics?: string[];
  languages?: Record<string, string>;
}

const LeetCodeAnalysis = ({ verdict = "Syncing...", topics = [], languages = {} }: AnalysisProps) => {
  return (
    <div style={styles.container}>
      <style>
        {`
          .custom-scroll::-webkit-scrollbar { width: 4px; }
          .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.01); }
          .custom-scroll::-webkit-scrollbar-thumb { background: rgba(190, 24, 93, 0.3); border-radius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb:hover { background: #be185d; box-shadow: 0 0 10px #be185d; }
        `}
      </style>

      <div style={styles.scrollWrapper} className="custom-scroll">
        {/* 1. NEURAL VERDICT */}
        <div style={styles.section}>
          <div style={styles.highlightHeader}>
            <span style={styles.label}>NEURAL_ALGO_REPORT</span>
          </div>
          <p style={styles.validationText}>{verdict}</p>
        </div>

        <div style={styles.divider} />

        {/* 2. TOPICS */}
        <div style={styles.section}>
          <div style={styles.highlightHeader}>
            <span style={styles.label}>DOMAIN_EXPERTISE</span>
          </div>
          <div style={styles.skillTagContainer}>
            {topics.map((t, i) => (
              <span key={i} style={styles.miniTag}>{t.toUpperCase()}</span>
            ))}
          </div>
        </div>

        <div style={styles.divider} />

        {/* 3. LANGUAGES */}
        <div style={styles.section}>
          <div style={styles.highlightHeader}>
            <span style={styles.label}>LANGUAGE_PROFICIENCY</span>
          </div>
          <div style={styles.langList}>
            {Object.entries(languages).map(([lang, val], idx) => (
              <div key={idx} style={styles.langBlock}>
                <div style={styles.entryHeader}>
                  <span style={styles.langName}>{lang}</span>
                  <span style={styles.valTag}>{val}</span>
                </div>
                <div style={styles.progressBg}>
                  <div style={{...styles.progressFill, width: val}} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '20px', flexShrink: 0 }} />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  scrollWrapper: { flex: 1, display: 'flex', flexDirection: 'column', gap: '28px', overflowY: 'auto' },
  divider: { height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.05)', width: '100%', flexShrink: 0 },
  section: { display: 'flex', flexDirection: 'column', gap: '14px' },
  highlightHeader: { 
    background: 'rgba(30, 41, 59, 0.5)', padding: '4px 12px', borderRadius: '4px', 
    borderLeft: '3px solid #be185d', alignSelf: 'flex-start' 
  },
  label: { fontSize: '10px', fontWeight: 900, color: '#f8fafc', fontFamily: 'var(--font-mono)', letterSpacing: '2px' },
  validationText: { fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', margin: 0 },
  skillTagContainer: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  miniTag: { 
    fontSize: '9px', background: 'rgba(190, 24, 93, 0.05)', color: '#be185d', 
    padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(190, 24, 93, 0.2)', fontFamily: 'var(--font-mono)' 
  },
  langList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  langBlock: { display: 'flex', flexDirection: 'column', gap: '6px' },
  entryHeader: { display: 'flex', justifyContent: 'space-between' },
  langName: { fontSize: '12px', color: '#f1f5f9', fontWeight: 600, fontFamily: 'var(--font-mono)' },
  valTag: { fontSize: '10px', color: '#be185d', fontFamily: 'var(--font-mono)' },
  progressBg: { height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' },
  progressFill: { height: '100%', background: '#be185d', boxShadow: '0 0 8px #be185d' }
};

export default LeetCodeAnalysis;
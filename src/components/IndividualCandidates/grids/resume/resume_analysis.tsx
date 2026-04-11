import React, { useState } from 'react';
import ResumeTop from './resume_top';

interface ResumeAnalysisProps {
  matchScore?: number;
  neuralValidation?: string;
  experienceHistory?: string[];
  topSkills?: string[];
}

const ResumeAnalysis = ({ 
  matchScore = 0, 
  neuralValidation = "Neural sync in progress...", 
  experienceHistory = [], 
  topSkills = [] 
}: ResumeAnalysisProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      style={isExpanded ? styles.cardExpanded : styles.cardCollapsed} 
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* HEADER SECTION: Always visible */}
      <ResumeTop matchScore={matchScore} topSkills={topSkills} />

      {/* EXPANDABLE SECTION: Hidden by default */}
      {isExpanded && (
        <div style={styles.expandedContent}>
          <div style={styles.divider} />
          
          <div style={styles.section}>
            <span style={styles.label}>NEURAL_REPORT</span>
            <p style={styles.validationText}>{neuralValidation}</p>
          </div>

          <div style={styles.section}>
            <span style={styles.label}>EXPERIENCE_LOG</span>
            <div style={styles.list}>
              {experienceHistory.length > 0 ? (
                experienceHistory.map((item, index) => (
                  <div key={index} style={styles.listItem}>
                    <span style={styles.dot}>•</span> {item}
                  </div>
                ))
              ) : (
                <div style={styles.listItem}>NO_HISTORY_DETECTED</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* INTERACTION HINT */}
      <div style={styles.footer}>
        <span style={styles.footerText}>
          {isExpanded ? 'CLICK_TO_COLLAPSE' : 'CLICK_TO_EXPAND_METRICS'}
        </span>
      </div>
    </div>
  );
};

const styles = {
  cardCollapsed: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    cursor: 'pointer',
    width: '100%',
    padding: '0px',
  },
  cardExpanded: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    cursor: 'pointer',
    width: '100%',
    padding: '0px',
  },
  expandedContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    animation: 'fadeIn 0.2s ease-out',
  },
  divider: { height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.05)', width: '100%' },
  section: { display: 'flex', flexDirection: 'column' as const, gap: '8px' },
  label: { fontSize: '9px', fontWeight: 800, color: '#475569', fontFamily: 'var(--font-mono)', letterSpacing: '1.5px' },
  validationText: { fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', margin: 0 },
  list: { display: 'flex', flexDirection: 'column' as const, gap: '8px' },
  listItem: { fontSize: '12px', color: '#cbd5e1', fontFamily: 'var(--font-mono)', display: 'flex', gap: '8px' },
  dot: { color: '#be185d' },
  footer: { marginTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.03)', paddingTop: '12px', textAlign: 'center' as const },
  footerText: { fontSize: '8px', color: '#334155', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }
};

export default ResumeAnalysis;
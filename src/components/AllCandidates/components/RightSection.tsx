import React, { useState } from 'react';

const RightSection = ({jobDescription, setJobDescription}) => {
  const [submitted, setSubmitted] = useState('');

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.key === 'Enter' && !e.shiftKey) {
  //     e.preventDefault();
  //     if (jobDescription.trim()) {
  //       setSubmitted(jobDescription.trim());
  //       setJobDescription('');
  //     }
  //   }
  // };

  const handleSubmit = () => {
    if (jobDescription.trim()) {
      setJobDescription(jobDescription);
      setSubmitted(jobDescription.trim());
    }
  };

  return (
    <div style={styles.container} className="hide-scrollbar">
      {/* Job Description Input Card */}
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <p style={styles.cardLabel}>Enter Job Description</p>
          <span style={styles.tag}>AI_READY</span>
        </div>
        <p style={styles.cardHint}>
          Paste requirements 
        </p>

        <textarea
          style={styles.textarea}
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          placeholder="e.g. We're looking for a Senior React Engineer..."
          rows={6}
        />

        <div style={styles.textareaFooter}>
          <span style={styles.hint}>SHIFT + ENTER FOR NEW LINE</span>
          <button
            style={{ 
              ...styles.submitBtn, 
              opacity: jobDescription.trim() ? 1 : 0.3, 
              cursor: jobDescription.trim() ? 'pointer' : 'not-allowed' 
            }}
            onClick={handleSubmit}
            disabled={!jobDescription.trim()}
          >
            Save Job Descriptions
          </button>
        </div>
      </div>

      {/* Submitted Job Description Display */}
      {submitted && (
        <div style={styles.resultCard}>
          <div style={styles.resultHeader}>
            <div style={styles.resultDot} />
            <p style={styles.resultLabel}>ACTIVE_PARAMETERS_SAVED</p>
            <button style={styles.clearBtn} onClick={() => setSubmitted('')}>
              RESET
            </button>
          </div>
          <div style={styles.divider} />
          <p style={styles.resultText}>{submitted}</p>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%', // Take entire container space
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    backgroundColor: '#020617', // Match the rest of the app
  },
  card: {
    background: 'rgba(15, 23, 42, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
   fontSize: '18px',
    fontWeight: 800,
    color: '#f1f5f9',
    margin: 0,
    fontFamily: 'var(--font-roboto)',
    letterSpacing: '1px',
  },
  tag: {
    fontSize: '9px',
    fontWeight: 900,
    color: '#be185d',
    fontFamily: 'var(--font-roboto)',
  },
  cardHint: {
    fontSize: '12px',
    color: '#64748b',
    margin: 0,
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    fontSize: '13px',
    color: '#f1f5f9',
    background: '#0f172a',
    resize: 'none',
    outline: 'none',
    lineHeight: 1.6,
    fontFamily: 'var(--font-roboto)',
    boxSizing: 'border-box' as const,
  },
  textareaFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hint: {
    fontSize: '9px',
    color: '#334155',
    fontWeight: 700,
  },
  submitBtn: {
    fontSize: '10px',
    fontWeight: 800,
    color: '#ffffff',
    background: '#be185d',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    fontFamily: 'var(--font-roboto)',
    transition: 'all 0.2s',
  },
  resultCard: {
    background: 'rgba(190, 24, 93, 0.03)',
    border: '1px solid rgba(190, 24, 93, 0.2)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  resultHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  resultDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#be185d',
    boxShadow: '0 0 8px #be185d',
  },
  resultLabel: {
    fontSize: '10px',
    fontWeight: 800,
    color: '#be185d',
    flex: 1,
    margin: 0,
    fontFamily: 'var(--font-roboto)',
  },
  clearBtn: {
    fontSize: '9px',
    fontWeight: 800,
    color: '#475569',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-roboto)',
  },
  divider: {
    height: '1px',
    background: 'rgba(190, 24, 93, 0.1)',
  },
  resultText: {
    fontSize: '12px',
    color: '#94a3b8',
    lineHeight: 1.6,
    margin: 0,
    whiteSpace: 'pre-wrap' as const,
    fontFamily: 'var(--font-roboto)',
  },
};

export default RightSection;
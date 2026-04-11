import React, { useMemo } from 'react';
import ResumeTop from './resume_top';
import ResumeAnalysis from './resume_analysis';

const ResumeGrid = ({ data, isExpanded }: { data: any, isExpanded: boolean }) => {
  const parsedData = useMemo(() => {
    if (!data) return null;
    try {
      const raw = data.content ? data.content : data;
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (e) {
      return null;
    }
  }, [data]);

  if (!parsedData) return null;

  const containerStyle = isExpanded ? styles.expandedContainer : styles.gridContainer;

  return (
    <div style={containerStyle}>
      {/* SECTION 1: FIXED TOP (No scrolling here) */}
      <ResumeTop percentage={parsedData.match_percentage} />
      
      {/* SECTION 2: SCROLLABLE BODY */}
      <div style={styles.scrollArea}>
        <ResumeAnalysis data={parsedData} />
      </div>

      {!isExpanded && (
        <div style={styles.footer}>
          <span style={styles.clickHint}>CLICK_TO_EXPAND</span>
        </div>
      )}
    </div>
  );
};

const styles = {
  gridContainer: { 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column' as const,
    overflow: 'hidden', // Clips everything outside the flex flow
    position: 'relative' as const,
    backgroundColor: '#020617' 
  },
  expandedContainer: { 
    width: '100%', 
    maxWidth: '700px', 
    margin: '0 auto', 
    height: '75vh', 
    display: 'flex', 
    flexDirection: 'column' as const,
    background: '#020617',
    borderRadius: '12px',
    border: '1px solid #1e293b',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
  },
  scrollArea: { 
    flex: 1, 
    overflowY: 'auto' as const, // ONLY this part scrolls
    backgroundColor: '#020617'
  },
  footer: {
    padding: '10px 20px',
    borderTop: '1px solid rgba(255,255,255,0.02)',
    textAlign: 'right' as const,
    background: '#020617'
  },
  clickHint: { fontSize: '9px', color: '#334155', fontWeight: 800, letterSpacing: '1px' }
};

export default ResumeGrid;
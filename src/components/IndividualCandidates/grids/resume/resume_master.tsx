import React, { useMemo } from 'react';
import ResumeTop from './resume_top';
import ResumeAnalysis from './resume_analysis';

const ResumeGrid = ({ data, isExpanded }: { data: any, isExpanded: boolean }) => {
  const parsedData = useMemo(() => {
    if (!data) return null;
    try {
      // Logic to handle both raw objects and JSON strings from the API
      const raw = data.content ? data.content : data;
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (e) {
      console.error("Failed to parse resume data", e);
      return null;
    }
  }, [data]);

  if (!parsedData) return null;

  const containerStyle = isExpanded ? styles.expandedContainer : styles.gridContainer;

  return (
    <div style={containerStyle}>
      {/* 1. THE HEADER: Score Ring & Top Skills */}
      <div style={styles.fixedHeader}>
        <ResumeTop 
          matchScore={parsedData.match_percentage} 
          topSkills={parsedData.top_8_skills} 
        />
      </div>
      
      {/* 2. THE DETAILED ANALYSIS: Only shown when expanded */}
      {isExpanded && (
        <div style={styles.scrollArea} className="custom-scroll">
          <ResumeAnalysis 
            neuralValidation={parsedData.quick_verdict} // Using verdict for the report
            detailedExperience={parsedData.detailed_experience}
            detailedEducation={parsedData.detailed_education}
          />
          
          <div style={styles.footer}>
            <span style={styles.clickHint}>ANALYSIS_COMPLETE_::_{new Date().getFullYear()}</span>
          </div>
        </div>
      )}

      {/* 3. COLLAPSED VIEW HINT: Shown when not expanded */}
      {/* {!isExpanded && (
        <div style={styles.collapsedOverlay}>
          <span style={styles.clickHint}>CLICK_TO_EXPAND_DOSSIER</span>
        </div>
      )} */}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  gridContainer: { 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    overflow: 'hidden', 
    position: 'relative',
    backgroundColor: '#020617',
    padding: '20px',
    boxSizing: 'border-box'
  },
  expandedContainer: { 
    width: '100%', 
    height: '100%', // Takes up the full height of the parent grid tile
    display: 'flex', 
    flexDirection: 'column', 
    background: '#020617',
    overflow: 'hidden',
    padding: '24px',
    boxSizing: 'border-box'
  },
  fixedHeader: {
    flexShrink: 0,
    marginBottom: '16px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '16px'
  },
  scrollArea: { 
    flex: 1, 
    overflowY: 'auto', 
    backgroundColor: '#020617',
    paddingRight: '8px',
  },
  collapsedOverlay: {
    marginTop: 'auto',
    textAlign: 'center',
    padding: '10px',
    borderTop: '1px solid rgba(255,255,255,0.02)'
  },
  footer: {
    padding: '24px 0 10px 0',
    textAlign: 'center',
    opacity: 0.5
  },
  clickHint: { 
    fontSize: '9px', 
    color: '#475569', 
    fontWeight: 800, 
    letterSpacing: '2px', 
    fontFamily: 'var(--font-mono)' 
  }
};

export default ResumeGrid;
import React, { useMemo } from 'react';
import ResumeTop from './resume_top';
import ResumeAnalysis from './resume_analysis';

const ResumeGrid = ({ data, isExpanded }: { data: any, isExpanded: boolean }) => {
  console.log(data)
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
      {/* 1. THE HEADER: Ring & Top 10 Skills 
          Note: We pass parsedData.match_percentage and parsedData.top_skills 
      */}
      <div style={styles.fixedHeader}>
        <ResumeTop 
          matchScore={parsedData.match_percentage} 
          topSkills={parsedData.top_8_skills} 
        />
      </div>
      
      

      {isExpanded && (
         <div>
        <ResumeAnalysis 
          neuralValidation={parsedData.neural_validation}
          experienceHistory={parsedData.experience_history}
          // We pass these as empty/hidden inside ResumeAnalysis 
          // to avoid the double-ring visual.
        />
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
    overflow: 'hidden', 
    position: 'relative' as const,
    backgroundColor: '#020617',
    padding: '24px' // Add padding so it's not touching the edges
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
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    padding: '24px'
  },
  fixedHeader: {
    flexShrink: 0,
    marginBottom: '20px',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    paddingBottom: '20px'
  },
  scrollArea: { 
    flex: 1, 
    overflowY: 'auto' as const,
    backgroundColor: '#020617',
    paddingRight: '4px' // Space for the scrollbar
  },
  footer: {
    padding: '10px 0',
    textAlign: 'right' as const,
    background: '#020617'
  },
  clickHint: { fontSize: '9px', color: '#334155', fontWeight: 800, letterSpacing: '1px' }
};

export default ResumeGrid;
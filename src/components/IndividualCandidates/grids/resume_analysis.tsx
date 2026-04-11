import React from 'react';
import ReactMarkdown from 'react-markdown';

const ResumeAnalysis = ({ data }: any) => {
  if (!data?.content) return <div style={{color: '#475569'}}>EXTRACTING_DATA...</div>;

  return (
    <div className="markdownWrapper custom-scroll">
      <div style={localStyles.scoreRow}>
        <div style={localStyles.radialScore}>85%</div>
        <div style={localStyles.scoreLabel}>JD_ALIGNMENT</div>
      </div>
      
      <ReactMarkdown>{data.content}</ReactMarkdown>
    </div>
  );
};

const localStyles = {
  scoreRow: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '15px', 
    marginBottom: '20px',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '10px'
  },
  radialScore: { fontSize: '28px', fontWeight: 900, color: '#be185d' },
  scoreLabel: { fontSize: '9px', fontWeight: 800, color: '#64748b' },
};

export default ResumeAnalysis;
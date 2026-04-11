import React, { useMemo } from 'react';
import PortfolioTop from './portfolio_top';
import PortfolioAnalysis from './portfolio_analysis';

const PortfolioMaster = ({ data, isExpanded }: { data: any, isExpanded: boolean }) => {
  const parsedData = useMemo(() => {
    if (!data) return null;
    try {
      const raw = data.content ? data.content : data;
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (e) {
      console.error("Failed to parse portfolio data", e);
      return null;
    }
  }, [data]);

  if (!parsedData) return null;

  const containerStyle = isExpanded ? styles.expandedContainer : styles.gridContainer;

  return (
    <div style={containerStyle}>
      {/* 1. THE HEADER: Score Ring & Top Tech */}
      <div style={styles.fixedHeader}>
        <PortfolioTop 
          matchScore={parsedData.match_percentage} 
          languages={parsedData.tech_stack_summary?.languages || []}
          frameworks={parsedData.tech_stack_summary?.frameworks || []}
        />
      </div>
      
      {/* 2. THE DETAILED ANALYSIS: Only shown when expanded */}
      {isExpanded && (
        <div style={styles.scrollArea} className="custom-scroll">
          <PortfolioAnalysis 
            verdict={parsedData.portfolio_verdict}
            projects={parsedData.main_projects || []}
          />
          
          <div style={styles.footer}>
            <span style={styles.clickHint}>PORTFOLIO_DOSSIER_COMPLETE_::_{new Date().getFullYear()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  gridContainer: { height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: '#020617', padding: '20px', boxSizing: 'border-box' },
  expandedContainer: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#020617', overflow: 'hidden', padding: '24px', boxSizing: 'border-box' },
  fixedHeader: { flexShrink: 0, marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' },
  scrollArea: { flex: 1, overflowY: 'auto', backgroundColor: '#020617', paddingRight: '8px' },
  footer: { padding: '24px 0 10px 0', textAlign: 'center', opacity: 0.5 },
  clickHint: { fontSize: '9px', color: '#475569', fontWeight: 800, letterSpacing: '2px', fontFamily: 'var(--font-mono)' }
};

export default PortfolioMaster;
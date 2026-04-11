import React, { useState } from 'react';
import CandidateInformation from './candidateInformation';
import ResumeGrid from '../grids/resume/resume_master';
import PortfolioTop from '../grids/portfolio_top';
import LeetCodeTop from '../grids/leetcode_top';
import ExecutiveTop from '../grids/executive_top';
import PortfolioAnalysis from '../grids/portfolio_analysis';
import LeetCodeAnalysis from '../grids/leetcode_analysis';
import ExecutiveVerdict from '../grids/executive_verdict';

const MiddleSection = ({ results, overallResult, selectedCandidate, activeView, showGrid, isLoading }: any) => {
  const [expandedTile, setExpandedTile] = useState<number | null>(null);

  const renderTile = (index: number, title: string, content: any, label: string) => {
    const isExpanded = expandedTile === index;
    if (expandedTile !== null && !isExpanded) return null;

    return (
      <div 
        onClick={() => !isLoading && setExpandedTile(isExpanded ? null : index)}
        style={{ 
          ...styles.tile, 
          ...(isExpanded ? styles.expanded : {}),
          cursor: isLoading ? 'wait' : (isExpanded ? 'zoom-out' : 'pointer'),
        }}
      >
        <div style={styles.tileHeader}>
          <span style={styles.tileTitle}>{title}</span>
          <span style={styles.tileLabel}>{label}</span>
        </div>
        
        <div style={styles.scrollWrapper} className="custom-scroll">
          {content}
        </div>

        {!isExpanded && !isLoading && <div style={styles.zoomHint}>CLICK_TO_EXPAND</div>}
      </div>
    );
  };

  return (
    <div style={styles.outerContainer}>
      {!showGrid ? (
        /* 🚀 INDIVIDUAL VIEW: Collapsing Hero Logic */
        <div style={styles.fullViewContainer}>
          
          {/* BIO_UPLINK: Pinned to top with higher Z-Index */}
          <div style={{
            ...styles.bioWrapper,
            flex: activeView ? '0 0 48px' : '1 1 auto', 
            zIndex: 10,
            position: 'relative',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' 
          }}>
            <CandidateInformation 
              candidate={selectedCandidate} 
              fullHeight={!activeView} 
            />
          </div>

          {/* SOURCE_DOSSIER: Claims remaining space with minHeight: 0 to prevent overflow */}
          <div style={{
            ...styles.sourceWrapper,
            flex: activeView ? 1 : 0,
            opacity: activeView ? 1 : 0,
            pointerEvents: activeView ? 'auto' : 'none',
            minHeight: 0 // CRITICAL: Allows flex child to shrink properly
          }}>
            <div style={styles.matrixHeader}>
              <div style={styles.headerTitleRow}>
                <h2 style={styles.title}>SOURCE_DOSSIER</h2>
                <div style={styles.activeLine} />
              </div>
            </div>
            <div style={styles.viewerFlexFrame}>
              <SourceViewer activeView={activeView} selectedCandidate={selectedCandidate} />
            </div>
          </div>
        </div>
      ) : (
        /* 📊 COMPETENCY MATRIX (GRID VIEW) */
        <div style={styles.gridViewContainer}>
          <div style={styles.compactBioWrapper}>
            <CandidateInformation candidate={selectedCandidate} fullHeight={false} />
          </div>

          <div style={styles.matrixHeader}>
            <div style={styles.headerTitleRow}>
              <h2 style={styles.title}>COMPETENCY_MATRIX</h2>
              <div style={styles.activeLine} />
            </div>
          </div>

          <div style={styles.gridContent}>
            <div style={styles.grid}>
              {renderTile(0, "RESUME ALIGNMENT", (
                <ResumeGrid 
                  data={results?.find((r: any) => r.domain.toLowerCase().includes('resume'))} 
                  isExpanded={expandedTile === 0} 
                />
              ), "PDF_CORE")}

              {renderTile(1, "PROJECT DEPTH", (
                <>
                  <PortfolioTop />
                  <PortfolioAnalysis data={results?.find((r: any) => r.domain === 'portfolio')} />
                </>
              ), "WEB_PORTFOLIO")}

              {renderTile(2, "PROBLEM SOLVING", (
                <>
                  <LeetCodeTop />
                  <LeetCodeAnalysis data={results?.find((r: any) => r.domain === 'leetcode')} />
                </>
              ), "LEETCODE_STATS")}

              {renderTile(3, "EXECUTIVE VERDICT", (
                <>
                  <ExecutiveTop />
                  <ExecutiveVerdict summary={overallResult} />
                </>
              ), "AI_SYNTHESIS")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SourceViewer = ({ activeView, selectedCandidate }: any) => {
  if (!activeView) return null;
  const isFile = activeView.type === 'file';
  const source = isFile ? selectedCandidate?.resumeUrl : activeView.content;
  
  return (
    <div style={styles.viewerFrame}>
      <div style={styles.browserBar}>
        <div style={styles.addressBox}>
          <span style={styles.protocol}>{isFile ? "FILE://" : "HTTPS://"}</span>
          <span style={styles.addressText}>{isFile ? "LOCAL_CACHE/SOURCE_DOC.PDF" : source}</span>
        </div>
      </div>
      <iframe src={source} style={styles.iframe} title="viewer" />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  outerContainer: { 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    background: '#020617', 
    height: '100%', 
    width: '100%',
    padding: '24px',
    boxSizing: 'border-box',
    overflow: 'hidden' 
  },
  fullViewContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    gap: '16px', // Gap between Navbar and Dossier
    minHeight: 0
  },
  bioWrapper: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  sourceWrapper: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: '12px', 
    overflow: 'hidden',
    transition: 'all 0.4s ease'
  },
  viewerFlexFrame: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    minHeight: 0
  },
  gridViewContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  compactBioWrapper: {
    flexShrink: 0,
    marginBottom: '20px'
  },
  gridContent: {
    flex: 1,
    overflow: 'hidden'
  },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(2, 1fr)', 
    gridTemplateRows: 'repeat(2, 1fr)', 
    gap: '24px', 
    height: '100%'
  },
  matrixHeader: { paddingBottom: '8px', flexShrink: 0 },
  headerTitleRow: { display: 'flex', flexDirection: 'column', gap: '4px' },
  title: { fontSize: '10px', color: '#475569', letterSpacing: '2px', fontFamily: 'var(--font-mono)' },
  activeLine: { width: '40px', height: '2px', background: '#be185d', boxShadow: '0 0 10px #be185d' },
  tile: { 
    background: 'rgba(15, 23, 42, 0.3)', 
    border: '1px solid rgba(255, 255, 255, 0.12)', 
    borderRadius: '16px', 
    padding: '24px', 
    display: 'flex', 
    flexDirection: 'column', 
    overflow: 'hidden', 
    position: 'relative' as const,
  },
  expanded: { gridColumn: '1 / -1', gridRow: '1 / -1', border: '1px solid #be185d', zIndex: 10, background: '#020617' },
  tileHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px' },
  tileTitle: { fontSize: '11px', color: '#f8fafc', fontFamily: 'var(--font-mono)' },
  tileLabel: { fontSize: '9px', color: '#be185d', fontFamily: 'var(--font-mono)' },
  scrollWrapper: { flex: 1, overflowY: 'auto' },
  zoomHint: { position: 'absolute' as const, bottom: '12px', right: '16px', fontSize: '8px', color: '#334155' },
  
  // VIEWER UI
  viewerFrame: { flex: 1, borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.15)', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#0f172a' },
  browserBar: { background: '#1e293b', padding: '10px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' },
  addressBox: { background: '#020617', padding: '6px 12px', borderRadius: '6px', display: 'flex', gap: '8px', alignItems: 'center' },
  protocol: { color: '#be185d', fontSize: '9px', fontFamily: 'var(--font-mono)', fontWeight: 'bold' },
  addressText: { color: '#94a3b8', fontSize: '10px', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  iframe: { flex: 1, border: 'none', background: '#fff' }
};

export default MiddleSection;
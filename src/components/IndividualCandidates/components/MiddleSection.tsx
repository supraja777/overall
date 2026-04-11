import React, { useState } from 'react';
import CandidateInformation from './candidateInformation';
import ResumeGrid from '../grids/resume/resume_master';
import ExecutiveTop from '../grids/executive_top';
import ExecutiveVerdict from '../grids/executive_verdict';
import PortfolioMaster from '../grids/portfolio/portfolio_masters';
import LeetCodeMaster from '../grids/leetcode/leetcode_master';
import AnalysingGridCard from './AnalysingGridCard';

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
          
          {/* BIO_UPLINK: Navigation Header */}
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

          {/* SOURCE_DOSSIER: Browser Viewport */}
          <div style={{
            ...styles.sourceWrapper,
            flex: activeView ? 1 : 0,
            opacity: activeView ? 1 : 0,
            pointerEvents: activeView ? 'auto' : 'none',
            minHeight: 0 
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
                <div>
                 
                {isLoading ? (
                  // SHOW THE SPINNING PLACEHOLDER
                  <AnalysingGridCard  />
                ) : (
                  // SHOW THE ACTUAL GRID IF NOT LOADING
                  <div className="fade-in-content">
                    <ResumeGrid 
                     data={results?.find((r: any) => r.domain.toLowerCase().includes('resume'))}
                    isExpanded={expandedTile === 0} />
                  </div>
                )}
                </div>
              ), "PDF_CORE")}

              {renderTile(1, "PROJECT DEPTH", (
                <div>
                 
                {isLoading ? (
                  // SHOW THE SPINNING PLACEHOLDER
                  <AnalysingGridCard  />
                ) : (
                  // SHOW THE ACTUAL GRID IF NOT LOADING
                  <div className="fade-in-content">
                    <PortfolioMaster 
                     data={results?.find((r: any) => r.domain.toLowerCase().includes('portfolio'))}
                    isExpanded={expandedTile === 0} />
                  </div>
                )}
                </div>
              ), "WEB_PORTFOLIO")}
        
               {renderTile(2, "PROBLEM SOLVING", (
                <div>
                 
                {isLoading ? (
                  // SHOW THE SPINNING PLACEHOLDER
                  <AnalysingGridCard  />
                ) : (
                  // SHOW THE ACTUAL GRID IF NOT LOADING
                  <div className="fade-in-content">
                    <LeetCodeMaster 
                     data={results?.find((r: any) => r.domain.toLowerCase().includes('leetcode'))}
                    isExpanded={expandedTile === 0} />
                  </div>
                )}
                </div>
              ), "LEETCODE_STATS")}

                {renderTile(3, "AI_SYNTHESIS", (
                <div>
                 
                {isLoading ? (
                  // SHOW THE SPINNING PLACEHOLDER
                  <AnalysingGridCard  />
                ) : (
                   <>
                  <ExecutiveTop />
                  <ExecutiveVerdict summary={overallResult} />
                </>
                  // SHOW THE ACTUAL GRID IF NOT LOADING
                  
                )}
                </div>
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
    gap: '16px',
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
  
  viewerFrame: { flex: 1, borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.15)', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#0f172a' },
  browserBar: { background: '#1e293b', padding: '10px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' },
  addressBox: { background: '#020617', padding: '6px 12px', borderRadius: '6px', display: 'flex', gap: '8px', alignItems: 'center' },
  protocol: { color: '#be185d', fontSize: '9px', fontFamily: 'var(--font-mono)', fontWeight: 'bold' },
  addressText: { color: '#94a3b8', fontSize: '10px', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  iframe: { flex: 1, border: 'none', background: '#fff' },
  loadingCardContainer: {
    height: '240px',
    background: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '12px 0',
  },
  spinnerWrapper: { 
    position: 'relative', 
    width: '70px', // Slightly larger for the thicker ring
    height: '70px' 
  },
  thickRing: {
    position: 'absolute', 
    inset: 0,
    border: '6px solid rgba(190, 24, 93, 0.1)', // Subtle background of the circle
    borderTop: '6px solid #be185d',           // Thick spinning part
    borderRight: '6px solid #be185d',         // Makes it a 50% arc
    borderRadius: '50%',
    filter: 'drop-shadow(0 0 8px #be185d)',   // Makes the thick line glow
  },
  innerIcon: {
    position: 'absolute', 
    inset: 0,
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: '#be185d', 
    fontSize: '22px', 
    animation: 'pulse 1.5s infinite ease-in-out'
  },
};

export default MiddleSection;
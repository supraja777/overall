import { useEffect, useState } from 'react';
import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import RightSection from './components/RightSection';
import { agent } from '../IndividualCandidates/utils/agent';
import { scrapData } from '../IndividualCandidates/utils/scraper';
import { overall_agent } from '../../agents/overall_agent';
import { getFullContextForCompression, updateGlobalStorage } from '../IndividualCandidates/utils/storage';

// Dummy Data Imports
import resumeDummy from './results/resume_agent_result.json';
import portfolioDummy from './results/portfolio_agent_result.json';
import leetcodeDummy from './results/leetcode_agent_result.json';
import executiveDummy from './results/executive_result_agent.json';

export type UploadedItem = { 
  id: string; 
  name: string; 
  type: 'file' | 'url'; 
  content?: string; 
};

function IndividualCandidate({ jobDescription, selectedCandidate, onBack }: any) {
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [aiResults, setAiResults] = useState<{ domain: string; content: string }[]>([]);
  const [overallResult, setOverallResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showGrid, setShowGrid] = useState(true); 
  const [activeView, setActiveView] = useState<{ type: 'url' | 'file'; content: string } | null>(null);

  const addItem = (name: string, type: 'file' | 'url', content?: string) => {
    setItems((prev) => {
      if (prev.some(item => item.name === name)) return prev;
      return [{ id: Math.random().toString(36).substring(7), name, type, content }, ...prev];
    });
  };

  const loadDummyData = () => {
    setIsAnalyzing(true);

    const dummyPayload = [
      { domain: 'resume', content: JSON.stringify(resumeDummy) },
      { domain: 'portfolio', content: JSON.stringify(portfolioDummy) },
      { domain: 'leetcode', content: JSON.stringify(leetcodeDummy) }
    ];

    setAiResults(dummyPayload);
    setOverallResult(executiveDummy.executive_verdict);

    // Persist to storage for the RightSection AI context
    updateGlobalStorage('analysis', 'resume', JSON.stringify(resumeDummy));
    updateGlobalStorage('analysis', 'portfolio', JSON.stringify(portfolioDummy));
    updateGlobalStorage('analysis', 'leetcode', JSON.stringify(leetcodeDummy));

    setIsAnalyzing(false);
  };

  useEffect(() => {
    if (selectedCandidate) {
      const USE_DUMMY = true; 
      if (USE_DUMMY) {
        loadDummyData();
      } 
    }
  }, [selectedCandidate]);

  const runAnalysis = async () => {
    setShowGrid(true);
    // Logic for non-dummy analysis would trigger here
  };

  return (
    <div style={styles.appShell}>
      {/* Back Navigation */}
      <button onClick={onBack} style={styles.backBtn}>
        ← GALLERY
      </button>
      
      {/* Left Navigation: Fixed width for sources */}
      <LeftSection 
        items={items} 
        onAdd={addItem} 
        onRun={runAnalysis} 
        isAnalyzing={isAnalyzing} 
        selectedCandidate={selectedCandidate}
        onViewSource={(type, content) => {
          setShowGrid(false);
          setActiveView({ type, content });
        }}
      />

      {/* Middle Workspace: Flexible Area */}
      <div style={styles.middleContainer}>
        <MiddleSection 
          results={aiResults} 
          overallResult={overallResult}
          isLoading={isAnalyzing} 
          selectedCandidate={selectedCandidate}
          activeView={activeView}
          showGrid={showGrid}
        />
      </div>

      {/* Right Collaboration Section: Expanded Presence */}
      <div style={styles.rightContainer}>
        <RightSection jobDescription={jobDescription} />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appShell: { 
    display: 'flex', 
    height: '100vh', 
    width: '100vw', 
    backgroundColor: '#09090b', 
    overflow: 'hidden', 
    position: 'relative',
    fontFamily: '"Roboto", sans-serif'
  },
  middleContainer: {
    flex: 1, 
    minWidth: '0', 
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #1e293b',
    backgroundColor: '#020617'
  },
  rightContainer: {
    width: '460px', // Increased space for the Neural Collab chat
    flexShrink: 0,
    backgroundColor: '#09090b',
    display: 'flex',
    flexDirection: 'column'
  },
  backBtn: { 
    position: 'absolute', 
    top: '16px',        // Spacing from top edge
    right: '16px',      // Spacing from right edge (Extreme Right)
    zIndex: 1000,       // Ensure it is above the RightSection header
    
    // Aesthetic Updates for "Extreme Right" placement
    padding: '8px 14px', 
    background: 'rgba(190, 24, 93, 0.9)', // Slight transparency
    backdropFilter: 'blur(4px)',          // Neural glass effect
    color: '#fff', 
    border: '1px solid rgba(255, 255, 255, 0.1)', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    fontSize: '10px', 
    fontWeight: 900,
    fontFamily: 'monospace',
    letterSpacing: '1px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    transition: 'all 0.2s ease'
  }
  
};

export default IndividualCandidate;
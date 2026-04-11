import { useEffect, useState } from 'react';
import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import RightSection from './components/RightSection';
import { updateGlobalStorage } from '../IndividualCandidates/utils/storage';

// Dummy Data Imports
import resumeDummy from './results/resume_agent_result.json';
import portfolioDummy from './results/portfolio_agent_result.json';
import leetcodeDummy from './results/leetcode_agent_result.json';
import executiveDummy from './results/executive_result_agent.json';

// Define the Candidate Interface
export interface Candidate {
  id: string;
  name: string;
  role?: string;
  email?: string;
  // Add any other specific properties you use
}

export type UploadedItem = { 
  id: string; 
  name: string; 
  type: 'file' | 'url'; 
  content?: string; 
};

// Define Props for this component
interface IndividualCandidateProps {
  jobDescription: string;
  selectedCandidate: Candidate; // Properly typed
  onBack: () => void;
}

function IndividualCandidate({ jobDescription, selectedCandidate, onBack }: IndividualCandidateProps) {
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
  // 1. Start the animation immediately
  setIsAnalyzing(true);

  // 2. Wrap the logic in a timeout to create the "natural" delay
  setTimeout(() => {
    const dummyPayload = [
      { domain: 'resume', content: JSON.stringify(resumeDummy) },
      { domain: 'portfolio', content: JSON.stringify(portfolioDummy) },
      { domain: 'leetcode', content: JSON.stringify(leetcodeDummy) }
    ];

    setAiResults(dummyPayload);
    setOverallResult(executiveDummy.executive_verdict);

    updateGlobalStorage('analysis', 'resume', JSON.stringify(resumeDummy));
    updateGlobalStorage('analysis', 'portfolio', JSON.stringify(portfolioDummy));
    updateGlobalStorage('analysis', 'leetcode', JSON.stringify(leetcodeDummy));

    // 3. Stop the animation after 2.5 seconds
    setIsAnalyzing(false);
  }, 2500); 
};

  // const loadDummyData = () => {
  //   setIsAnalyzing(true);

  //   const dummyPayload = [
  //     { domain: 'resume', content: JSON.stringify(resumeDummy) },
  //     { domain: 'portfolio', content: JSON.stringify(portfolioDummy) },
  //     { domain: 'leetcode', content: JSON.stringify(leetcodeDummy) }
  //   ];

  //   setAiResults(dummyPayload);
  //   setOverallResult(executiveDummy.executive_verdict);

  //   updateGlobalStorage('analysis', 'resume', JSON.stringify(resumeDummy));
  //   updateGlobalStorage('analysis', 'portfolio', JSON.stringify(portfolioDummy));
  //   updateGlobalStorage('analysis', 'leetcode', JSON.stringify(leetcodeDummy));

  //   setIsAnalyzing(false);
  // };

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
  };

  return (
    <div style={styles.appShell}>
      {/* Back Navigation - Extreme Top Right */}
      <button onClick={onBack} style={styles.backBtn}>
        ← GALLERY
      </button>
      
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

      <div style={styles.rightContainer}>
        <RightSection 
          jobDescription={jobDescription} 
          candidate={selectedCandidate} 
        />
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
    width: '460px', 
    flexShrink: 0,
    backgroundColor: '#09090b',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10 // Keeps it below the floating back button
  },
  backBtn: { 
    position: 'absolute', 
    top: '18px',        
    right: '18px',      
    zIndex: 1100,       // Higher than rightContainer
    padding: '8px 14px', 
    background: '#be185d', // Solid pink for visibility on dark header
    color: '#fff', 
    border: '1px solid rgba(255, 255, 255, 0.2)', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    fontSize: '10px', 
    fontWeight: 900,
    fontFamily: 'monospace',
    letterSpacing: '1px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  }
};

export default IndividualCandidate;